"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="bg-[#1e1e1e] w-full flex flex-col justify-center items-center min-h-screen px-24 p">
      <div className="text-3xl font-semibold text-pink-300 pb-16">
        What would you like to learn?
      </div>
      <Textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type here..."
        className="h-14 text-lg bg-[#2a1a29] text-white border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 p-3 scrollable"
      />
    </div>
  );
}
