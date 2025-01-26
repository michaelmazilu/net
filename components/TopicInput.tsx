"use client";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseClient } from "@/utils/supabase/client";

export function TopicInput() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  // TODO: Replace with actual auth
  const userEmail = "vmazilu@uwaterloo.ca";

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      try {
        // Get user ID first
        const { data: user, error: userError } = await supabaseClient
          .from("users")
          .select("id")
          .eq("email", userEmail)
          .single();

        if (userError) throw userError;

        // Create new topic with user_id
        const { data: topic, error: topicError } = await supabaseClient
          .from("topics")
          .insert([
            {
              title: inputValue.trim(),
              user_id: user.id, // Include the user_id from the users query
            },
          ])
          .select()
          .single();

        if (topicError) throw topicError;

        // Navigate to the new topic page
        router.push(`/topics/${encodeURIComponent(inputValue)}`);
      } catch (error: any) {
        console.error("Error creating topic:", error.message);
        // TODO: Add proper error handling/display
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <div className="text-3xl font-semibold text-[#FA60D4] pb-16">
        What would you like to learn?
      </div>
      <div className="relative w-full">
        {" "}
        {/* Container for textarea and button */}
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask Net!"
          className="h-14 text-lg bg-[#2a1a29] text-white border-2 border-[#FA60D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 p-3 scrollable pr-12" // Added padding-right for icon
        />
        <button
          onClick={handleSubmit}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
        >
          {/* <FiSend size={24} /> Send icon */}
        </button>
      </div>
    </>
  );
}
