import { TopicInput } from "@/components/TopicInput";

export default function Home() {
  return (
    <main className="flex-1 min-h-screen">
      <div className="bg-[#262626] w-full flex flex-col justify-center items-center min-h-screen px-24">
        <TopicInput />
      </div>
    </main>
  );
}
