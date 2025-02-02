import { LLMResponse, GraphData, GraphNode, GraphLink } from "@/app/types";
import { supabaseClient } from "./supabase/client";

export async function organizeGraphData(
  content: string,
  topicId: string
): Promise<GraphData | undefined> {
  try {
    const data: LLMResponse = JSON.parse(content);
    console.log(data);
    data.topicId = topicId;

    // Save to database
    const { error: updateError } = await supabaseClient
      .from("topics")
      .update({ body: data })
      .eq("id", topicId);

    if (updateError) {
      console.error("Error updating topic:", updateError);
    }

    const nodes: GraphNode[] = [];
    const tempLinks: { source: string; target: string }[] = [];

    // Add topic node at top center
    nodes.push({
      id: `topic-${data.topicId}`,
      x: 400,
      y: 50, // Moved up
      label: data.topicName,
    });

    // Arrange units in an ascending line from left to right
    const unitSpacing = 200;
    const unitStartX = 400 - ((data.units.length - 1) * unitSpacing) / 2;
    const baseUnitY = 200; // Base Y position
    const unitSlope = 50; // Amount each unit rises from left to right

    data.units.forEach((unit, unitIndex) => {
      const unitX = unitStartX + unitIndex * unitSpacing;
      const unitY = baseUnitY + unitIndex * unitSlope; // Each unit is higher than the last

      nodes.push({
        id: `unit-${unit.unitId}`,
        x: unitX,
        y: unitY,
        label: unit.unitName,
      });

      // Link unit to topic
      tempLinks.push({
        source: `topic-${data.topicId}`,
        target: `unit-${unit.unitId}`,
      });

      // Arrange lessons in a grid below each unit
      const lessonsPerRow = 2;
      const lessonSpacing = 100;
      unit.lessons.forEach((lesson, lessonIndex) => {
        const row = Math.floor(lessonIndex / lessonsPerRow);
        const col = lessonIndex % lessonsPerRow;
        const lessonX = unitX + (col - 0.5) * lessonSpacing;
        const lessonY = unitY + 150 + row * lessonSpacing;

        nodes.push({
          id: `lesson-${lesson.lessonId}`,
          x: lessonX,
          y: lessonY,
          label: lesson.lessonName,
        });

        tempLinks.push({
          source: `unit-${unit.unitId}`,
          target: `lesson-${lesson.lessonId}`,
        });
      });
    });

    // Convert links to VisX format
    const mappedLinks = tempLinks.map((link) => {
      const sourceNode = nodes.find((node) => node.id === link.source);
      const targetNode = nodes.find((node) => node.id === link.target);

      if (!sourceNode || !targetNode) {
        throw new Error(`Invalid link: ${link.source} -> ${link.target}`);
      }

      return {
        source: { x: sourceNode.x, y: sourceNode.y },
        target: { x: targetNode.x, y: targetNode.y },
      };
    });

    return {
      nodes,
      links: mappedLinks,
    };
  } catch (error) {
    console.error("Error organizing graph data:", error);
    console.error("Failed content:", content);
    return undefined;
  }
}
