"use client";

import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react"; // Spinner icon
import { FiSend } from "react-icons/fi"; // Send icon

type GraphData = {
    nodes: {
        id: string;
        x: number;
        y: number;
        label: string;
        style: { stroke: string; strokeWidth: number; fill: string };
    }[];
    links: {
        source: { id: string };
        target: { id: string };
    }[];
};

export function TopicInput() {
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false); // State for loader
    const [submittedTopic, setSubmittedTopic] = useState<string | null>(null); // Store the submitted topic
    const [graphContent, setGraphContent] = useState<GraphData | null>(null); // Store graph content
    const userEmail = "vmazilu@uwaterloo.ca"; // TODO: Replace with actual auth

    const generateLearningPath = async (topic: string) => {
        // Mocked API call or replace this with your actual logic
        return {
            choices: [
                { message: { content: `Generated content for ${topic}` } },
            ],
        };
    };

    const parseLearningPath = (content: string): GraphData => {
        const steps = content.split("\n").filter(Boolean);

        // Limit the number of nodes (e.g., only the first 8 steps)
        const limitedSteps = steps.slice(0, 8);

        const mainNode = {
            id: "main-node",
            x: 400,
            y: 50,
            label: "Main Node",
            style: { stroke: "black", strokeWidth: 2, fill: "#f0f0f0" },
        };

        const primaryNodes = limitedSteps.slice(0, 3).map((step, index) => ({
            id: `primary-node-${index}`,
            x: 200 * (index + 1),
            y: 150 + index * 150,
            label: step,
            style: { stroke: "black", strokeWidth: 2, fill: "#ffffff" },
        }));

        const secondaryNodes = limitedSteps.slice(3).map((step, index) => ({
            id: `secondary-node-${index}`,
            x: 200 + Math.random() * 400,
            y: 250 + Math.random() * 200,
            label: step,
            style: { stroke: "black", strokeWidth: 2, fill: "#ffffff" },
        }));

        const nodes = [mainNode, ...primaryNodes, ...secondaryNodes];

        const links = [
            ...primaryNodes.map((node) => ({ source: mainNode, target: node })),
            ...primaryNodes.map((node, index) => ({
                source: node,
                target: secondaryNodes[index],
            })),
        ];

        return { nodes, links };
    };

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

                // Generate learning path content
                const learningPathData = await generateLearningPath(
                    topic.title
                );
                const content = learningPathData.choices[0].message.content;

                // Parse graph data (for optional client-side rendering)
                const graphData = parseLearningPath(content);
                setGraphContent(graphData); // Store parsed graph content

                // Redirect to the new topic page
                router.push(`/topics/${topic.id}`);
            } catch (error: any) {
                console.error("Error creating topic:", error.message);
                // TODO: Add proper error handling/display
            } finally {
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
            <div className="text-3xl text-center font-semibold text-[#FA60D4] pb-8">
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
                        <Loader2
                            className="animate-spin text-white"
                            size={24}
                        />
                    ) : (
                        <FiSend size={24} />
                    )}
                </button>
            </div>
        </>
    );
}
