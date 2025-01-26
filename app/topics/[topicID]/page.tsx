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
        <div className="flex-1 h-screen bg-[#2d2d2d] p-4">
            <ClientGraph content={content} />
        </div>
    );
}

// Helper function to parse learning path content into graph data
