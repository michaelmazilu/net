"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { supabaseClient } from "@/utils/supabase/client";
import { Auth } from "./Auth";
import { User } from "@supabase/supabase-js";
import { FaTrash } from "react-icons/fa"; // Trash icon

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

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
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
          .eq("user_id", user.id);

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
      <div className="w-80 h-screen bg-[#262626] text-white flex flex-col items-start p-4 shadow-md font-poppins">
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
    <div className="w-80 h-screen bg-[#262626] text-white flex flex-col items-start p-4 shadow-md font-poppins">
      <div className="w-full flex justify-center mb-6">
        <img
          src="/logonet.png"
          alt="Net Lessons Logo"
          className="w-auto h-auto"
        />
      </div>

      <div className="w-full mb-4">
        <Button onClick={handleSignOut} variant="ghost" className="w-full">
          Sign Out
        </Button>
      </div>

      {topics.map((topic) => (
        <div
          key={topic.id}
          className="group relative flex items-center w-full mb-4 whitespace-normal"
        >
          <Button
            className="shadow-none flex-grow text-lg font-medium text-left bg-transparent hover:bg-[#808080] hover:text-white py-2 px-4 rounded-md"
            topicID={topic.id} // Pass the topicID to the Button component
          >
            {topic.title}
          </Button>

          <FaTrash
            onClick={() => handleDelete(topic.id)}
            className="text-[#FA60D6] ml-2 cursor-pointer text-xl opacity-0 group-hover:opacity-100 transition-opacity transform hover:animate-shake"
          />
        </div>
      ))}
    </div>
  );
};
