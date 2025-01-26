"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { supabaseClient } from "@/utils/supabase/client";

interface Topic {
    id: string;
    title: string;
    description: string;
}

export const Sidebar: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // TODO: get user email from supabase with auth...
    // Hard-coded user email
    const userEmail = "vmazilu@uwaterloo.ca";

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const { data: users, error: userError } = await supabaseClient
                    .from("users")
                    .select("id")
                    .eq("email", userEmail)
                    .single();

                if (userError) {
                    throw userError;
                }

                const userId = users.id;

                // Step 2: Fetch topics for the retrieved user ID
                const { data: topicsData, error: topicsError } =
                    await supabaseClient
                        .from("topics")
                        .select("*")
                        .eq("user_id", userId);

                if (topicsError) {
                    throw topicsError;
                }

                setTopics(topicsData);
            } catch (err: any) {
                setError(
                    err.message || "An error occurred while fetching topics."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

    if (loading) {
        return (
            <div className="w-64 h-screen bg-[#262626] text-white flex flex-col items-start p-4 shadow-md font-poppins">
                <div className="w-full flex justify-center mb-6">
                    <img
                        src="/logonet.png"
                        alt="Net Lessons Logo"
                        className="w-auto h-auto"
                    />
                </div>

                <div className="w-full flex justify-center mb-6">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-64 h-screen bg-[#262626] text-white flex flex-col items-start p-4 shadow-md font-poppins">
            <div className="w-full flex justify-center mb-6">
                <img
                    src="/logonet.png"
                    alt="Net Lessons Logo"
                    className="w-auto h-auto"
                />
            </div>

            {topics.map((topic) => (
                <Button
                    key={topic.id}
                    className="flex items-center w-full rounded-xl text-lg font-medium my-4"
                    variant="ghost"
                >
                    {topic.title}
                </Button>
            ))}
        </div>
    );
};
