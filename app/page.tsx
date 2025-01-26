import { TopicInput } from "@/components/TopicInput";

export default async function Home() {
    return (
        <div className="bg-[#1e1e1e] w-full flex flex-col justify-center items-center min-h-screen px-24 ">
            <TopicInput />
        </div>
    );
}
