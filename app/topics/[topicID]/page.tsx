import ClientGraph from "@/components/ClientGraph";
import { generateLearningPath } from "@/utils/api";

export default async function TopicPage({
  params,
}: {
  params: { topicID: string };
}) {
  const awaitFix = await params;
  const topic = decodeURIComponent(awaitFix.topicID);
  const data = await generateLearningPath(topic);
  const content = data.choices[0].message.content;

  return (
    <main className="flex-1 min-h-screen">
      <div className="flex-1 h-screen bg-[#2d2d2d] p-4">
        <ClientGraph content={content} />
      </div>
    </main>
  );
}

function parseLearningPath(content: string) {
  const steps = content.split("\n").filter(Boolean);

  const limitedSteps = steps.slice(0, 8);

  const mainNode = {
    id: "main-node",
    x: 400,
    y: 50,
    label: "Main Node",
    style: { stroke: "black", strokeWidth: 2, fill: "#f0f0f0" },
  };

  const primaryNodes = limitedSteps.slice(0, 3).map((step, index) => ({
    id: `primary-node-${index}`,
    x: 200 * (index + 1),
    y: 150 + index * 150,
    label: step,
    style: { stroke: "black", strokeWidth: 2, fill: "#ffffff" },
  }));

  const secondaryNodes = limitedSteps.slice(3).map((step, index) => ({
    id: `secondary-node-${index}`,
    x: 200 + Math.random() * 400,
    y: 250 + Math.random() * 200,
    label: step,
    style: { stroke: "black", strokeWidth: 2, fill: "#ffffff" },
  }));

  const nodes = [mainNode, ...primaryNodes, ...secondaryNodes];

  const links = [
    ...primaryNodes.map((node) => ({ source: mainNode, target: node })),
    ...primaryNodes.map((node, index) => ({
      source: node,
      target: secondaryNodes[index],
    })),
  ];

  return { nodes, links };
}
