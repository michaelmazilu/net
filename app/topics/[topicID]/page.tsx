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

// Helper function to parse learning path content into graph data
function parseLearningPath(content: string) {
    const steps = content.split("\n").filter(Boolean); // Split content into steps

    // Limit the number of nodes (e.g., only the first 8 steps)
    const limitedSteps = steps.slice(0, 8);

    // Central node (Main node at the top)
    const mainNode = {
        id: "main-node",
        x: 400, // Center node at x=400
        y: 50, // Main node at the top
        label: "Main Node", // Main node label
        style: { stroke: "black", strokeWidth: 2, fill: "#f0f0f0" }, // Add border and styling
    };

    // Primary nodes around the central node
    const primaryNodes = limitedSteps.slice(0, 3).map((step, index) => ({
        id: `primary-node-${index}`,
        x: 200 * (index + 1), // Positioning the primary nodes horizontally
        y: 150 + index * 150, // Vertically spaced below the main node
        label: step,
        style: { stroke: "black", strokeWidth: 2, fill: "#ffffff" }, // Add border and styling
    }));

    // Secondary nodes branching from primary nodes
    const secondaryNodes = limitedSteps.slice(3).map((step, index) => ({
        id: `secondary-node-${index}`,
        x: 200 + Math.random() * 400, // Randomizing x to spread them out a bit
        y: 250 + Math.random() * 200, // Randomizing y for secondary nodes below primary nodes
        label: step,
        style: { stroke: "black", strokeWidth: 2, fill: "#ffffff" }, // Add border and styling
    }));

    // Combine the nodes into one array
    const nodes = [mainNode, ...primaryNodes, ...secondaryNodes];

    // Links (connect the central node to primary nodes, primary nodes to secondary nodes)
    const links = [
        ...primaryNodes.map((node) => ({ source: mainNode, target: node })),
        ...primaryNodes.map((node, index) => ({
            source: node,
            target: secondaryNodes[index],
        })),
    ];

    return { nodes, links };
}
