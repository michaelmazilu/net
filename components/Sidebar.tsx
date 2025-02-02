"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { supabaseClient } from "@/utils/supabase/client";
import { Auth } from "./Auth";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { FaTrash } from "react-icons/fa";

interface Topic {
  id: string;
  title: string;
  description: string;
}

export const Sidebar: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      if (!user) return;

      try {
        const { data: topicsData, error: topicsError } = await supabaseClient
          .from("topics")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }); // Sort newest first

        if (topicsError) {
          throw topicsError;
        }

        setTopics(topicsData);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching topics.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTopics();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
  };

  if (!user) {
    return (
      <div className="w-72 h-screen bg-[#1E1E1E]] text-white flex flex-col items-start p-4 shadow-md font-poppins">
        <div className="w-full flex justify-center mb-6">
          <img
            src="/netlogo1.png"
            alt="Net Lessons Logo"
            className="w-auto h-auto"
          />
        </div>
        <Auth />
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== id));

      const { error } = await supabaseClient
        .from("topics")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }
    } catch (err: any) {
      setTopics((prevTopics) => [
        ...prevTopics,
        { id, title: "", description: "" },
      ]);
      setError("An error occurred while deleting the topic.");
    }
  };

  if (loading) {
    return (
      <div className="w-72 h-screen bg-[#4A7FBC] text-white flex flex-col items-start p-4 shadow-md font-poppins">
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
    <div
      className="w-72 h-screen bg-[#1E1E1E] text-white flex flex-col p-4 shadow-md font-poppins"
      style={{ borderRight: "1px solid rgba(255, 255, 255, 0.1)" }}
    >
      <div className="w-full flex justify-center mb-6">
        <img
          src="/netlogo1.png"
          alt="Net Lessons Logo"
          className="max-w-[100px] h-auto"
        />
      </div>

      <div
        className="flex-grow overflow-y-auto max-h-[calc(100vh-150px)] custom-scrollbar"
        style={{ direction: "ltr" }}
      >
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="group flex items-center w-full mb-4 hover:bg-[#2E2E2E] rounded-md"
          >
            <Button
              onClick={() => router.push(`/topics/${topic.id}`)}
              className="shadow-none flex-1 min-w-0 text-lg font-medium text-left bg-transparent hover:bg-transparent hover:text-white py-2 px-4"
            >
              <div className="overflow-hidden whitespace-nowrap">
                {topic.title}
              </div>
            </Button>

            <div className="flex-shrink-0 px-2">
              <FaTrash
                onClick={() => handleDelete(topic.id)}
                className="text-[#B061FF] cursor-pointer text-xl opacity-0 group-hover:opacity-100 transition-opacity transform hover:animate-shake"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full mt-4">
        <Button onClick={handleSignOut} variant="ghost" className="w-full">
          Sign Out
        </Button>
      </div>
    </div>
  );
};
