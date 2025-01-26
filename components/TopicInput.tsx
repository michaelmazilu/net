"use client";

import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react"; // Spinner icon
import { FiSend } from "react-icons/fi"; // Send icon

export function TopicInput() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false); // State for loader
  const [showGraph, setShowGraph] = useState(false); // State to toggle graph
  const [submittedTopic, setSubmittedTopic] = useState<string | null>(null); // Store the submitted topic
  const userEmail = "vmazilu@uwaterloo.ca"; // TODO: Replace with actual auth

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      setLoading(true); // Start loader
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
              user_id: user.id,
            },
          ])
          .select()
          .single();

        if (topicError) throw topicError;

        // Set the submitted topic and show the graph
        setSubmittedTopic(inputValue.trim());
        setShowGraph(true);
      } catch (error: any) {
        console.error("Error creating topic:", error.message);
        // TODO: Add proper error handling/display
      } finally {
        setLoading(false); // Stop loader
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
      <div className="text-3xl text-center font-semibold text-[#FA60D4] pb-16">
        What would you like to learn?
      </div>
      <div className="relative w-full">
        {/* Container for textarea and button */}
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask Net!"
          className="h-14 text-lg bg-[#2a1a29] text-white border-2 border-[#FA60D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 p-3 scrollable pr-12"
        />
        <button
          onClick={handleSubmit}
          disabled={loading} // Disable button while loading
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
        >
          {loading ? (
            <Loader2 className="animate-spin text-white" size={24} />
          ) : (
            <FiSend size={24} />
          )}
        </button>
      </div>
      {showGraph && submittedTopic && (
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-6 text-white">
            Learning Path: {submittedTopic}
          </h1>
        </div>
      )}
    </>
  );
}
