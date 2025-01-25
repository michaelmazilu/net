import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-2xl font-bold">Enter your text here</div>
            <textarea className="w-full h-40 p-2 border border-gray-300 rounded-md text-black "></textarea>
        </div>
    );
}
