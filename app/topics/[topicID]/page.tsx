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
        <div className="bg-[#1e1e1e] w-full min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-white">
                    Learning Path: {topic}
                </h1>
                <div className="bg-[#2d2d2d] p-6 rounded-lg shadow-lg text-white whitespace-pre-wrap">
                    {content}
                </div>
            </div>
        </div>
    );
}
