import { TopicInput } from "@/components/TopicInput";
import { generateLearningPath } from "@/utils/api";

export default async function Home({
  searchParams,
}: {
  searchParams: { topic?: string };
}) {
  let content = null;
  const params = await searchParams;
  const topic = params.topic;

  if (topic) {
    console.log(topic);
    const data = await generateLearningPath(topic);
    content = data.choices[0].message.content;
    console.log(content);
  }

  return (
    <div className="bg-[#1e1e1e] w-full flex flex-col justify-center items-center min-h-screen px-24 p">
      <TopicInput />
    </div>
  );
}
