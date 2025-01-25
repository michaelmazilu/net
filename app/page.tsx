"use client";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = () => {
        if (inputValue.trim()) {
            router.push(`?topic=${encodeURIComponent(inputValue)}`);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    useEffect(() => {
        const topic = searchParams.get("topic");
        if (topic) {
            fetch(`/api/generate?topic=${encodeURIComponent(topic)}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Response:", data.choices[0].message.content);
                });
        }
    }, [searchParams]);

    return (
        <div className="bg-[#1e1e1e] w-full flex flex-col justify-center items-center min-h-screen px-24 p">
            <div className="text-3xl font-semibold text-pink-300 pb-16">
                What would you like to learn?
            </div>
            <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type here... (Press Enter to submit)"
                className="h-14 text-lg bg-[#2a1a29] text-white border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 p-3 scrollable"
            />
        </div>
    );
}
