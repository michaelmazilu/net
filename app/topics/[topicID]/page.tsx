import { generateLearningPath } from "@/utils/api";
import GraphComponent from "../../../components/GraphComponent"; // Import the visx graph component

export default async function TopicPage({
  params,
}: {
  params: { topicID: string };
}) {
  const awaitFix = await params;
  const topic = decodeURIComponent(awaitFix.topicID);
  const data = await generateLearningPath(topic);
  const content = data.choices[0].message.content;
  console.log("content: ", content);

  // Parse content to nodes and links for the graph

  return (
    <div className="bg-[#1e1e1e] w-full h-screen overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Learning Path: {topic}
        </h1>
        {/* <div className="bg-[#2d2d2d] p-6 rounded-lg shadow-lg text-white whitespace-pre-wrap mb-6">
          {content}
        </div> */}
        {/* Render the graph */}
        <div className="bg-[#2d2d2d] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Learning Path Graph
          </h2>
          <GraphComponent width={800} height={600} />
        </div>
      </div>
    </div>
  );
}

// Helper function to parse learning path content into graph data
