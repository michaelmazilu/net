import { LLMResponse, GraphData, GraphNode } from "@/app/types";
import { dummyGraphData } from "@/app/data/dummyGraphData";

export function organizeGraphData(content: string) {
  try {
    const data: LLMResponse = JSON.parse(content);
    console.log(data);
    // const nodes: GraphNode[] = [];
    // const links: { source: string; target: string }[] = [];

    // // Add topic node (center)
    // nodes.push({
    //   id: `topic-${data.topicId}`,
    //   x: 400,
    //   y: 100,
    //   label: data.topicName,
    // });

    // // Add unit nodes in a circle around the topic
    // data.units.forEach((unit, unitIndex) => {
    //   const angle = (2 * Math.PI * unitIndex) / data.units.length;
    //   const radius = 200;
    //   const unitX = 400 + radius * Math.cos(angle);
    //   const unitY = 300 + radius * Math.sin(angle);

    //   nodes.push({
    //     id: `unit-${unit.unitId}`,
    //     x: unitX,
    //     y: unitY,
    //     label: unit.unitName,
    //   });

    //   // Link unit to topic
    //   links.push({
    //     source: `topic-${data.topicId}`,
    //     target: `unit-${unit.unitId}`,
    //   });

    //   // Add lesson nodes around each unit
    //   unit.lessons.forEach((lesson, lessonIndex) => {
    //     const lessonAngle =
    //       angle + ((2 * Math.PI) / unit.lessons.length) * lessonIndex * 0.5;
    //     const lessonRadius = 150;
    //     const lessonX = unitX + lessonRadius * Math.cos(lessonAngle);
    //     const lessonY = unitY + lessonRadius * Math.sin(lessonAngle);

    //     nodes.push({
    //       id: `lesson-${lesson.lessonId}`,
    //       x: lessonX,
    //       y: lessonY,
    //       label: lesson.lessonName,
    //     });

    //     // Link lesson to unit
    //     links.push({
    //       source: `unit-${unit.unitId}`,
    //       target: `lesson-${lesson.lessonId}`,
    //     });
    //   });
    // });

    // // Convert links to the format expected by VisX
    // const mappedLinks = links.map((link) => {
    //   const sourceNode = nodes.find((node) => node.id === link.source);
    //   const targetNode = nodes.find((node) => node.id === link.target);

    //   if (!sourceNode || !targetNode) {
    //     throw new Error(`Invalid link: ${link.source} -> ${link.target}`);
    //   }

    //   return {
    //     source: { x: sourceNode.x, y: sourceNode.y },
    //     target: { x: targetNode.x, y: targetNode.y },
    //   };
    // });

    // return {
    //   nodes,
    //   links: mappedLinks,
    // };
  } catch (error) {
    console.error("Error organizing graph data:", error);
    return dummyGraphData;
  }
}
