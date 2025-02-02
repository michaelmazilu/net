import { LLMResponse, GraphData, GraphNode, GraphLink } from "@/app/types";
import { supabaseClient } from "./supabase/client";

export async function organizeGraphData(
  content: string,
  topicId: string
): Promise<GraphData | undefined> {
  try {
    console.log("content: ", content);
    const data: LLMResponse = JSON.parse(content);
    console.log(data);
    data.topicId = topicId;

    // Helper function for controlled randomness
    const jitter = (value: number, amount: number = 20) => {
      return value + (Math.random() - 0.5) * amount;
    };

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

    // Add topic node with slight jitter
    nodes.push({
      id: `topic-${data.topicId}`,
      x: jitter(400, 10),
      y: jitter(50, 15),
      label: data.topicName,
    });

    // Arrange units with randomness
    const unitSpacing = 200;
    const unitStartX = 400 - ((data.units.length - 1) * unitSpacing) / 2;
    const baseUnitY = 200;
    const unitSlope = 50;

    data.units.forEach((unit, unitIndex) => {
      const unitX = jitter(unitStartX + unitIndex * unitSpacing);
      const unitY = jitter(baseUnitY + unitIndex * unitSlope, 40);

      nodes.push({
        id: `unit-${unit.unitId}`,
        x: unitX,
        y: unitY,
        label: unit.unitName,
      });

      tempLinks.push({
        source: `topic-${data.topicId}`,
        target: `unit-${unit.unitId}`,
      });

      // Arrange lessons with more randomness
      const lessonsPerRow = 3;
      const lessonSpacing = 100;
      unit.lessons.forEach((lesson, lessonIndex) => {
        const row = Math.floor(lessonIndex / lessonsPerRow);
        const col = lessonIndex % lessonsPerRow;
        const lessonX = jitter(unitX + (col - 0.5) * lessonSpacing, 30);
        const lessonY = jitter(unitY + 150 + row * lessonSpacing * 2, 50);

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
