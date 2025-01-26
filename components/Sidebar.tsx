"use client";
import React, { useEffect, useState } from "react";
import { supabaseClient } from "@/utils/supabase/client";
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

  const userEmail = "vmazilu@uwaterloo.ca"; // Hard-coded user email

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

        const { data: topicsData, error: topicsError } = await supabaseClient
          .from("topics")
          .select("*")
          .eq("user_id", userId);

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

    fetchTopics();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // Step 1: Remove the topic from the state (UI)
      setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== id));

      // Step 2: Delete the topic from the database
      const { error } = await supabaseClient
        .from("topics")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }
    } catch (err: any) {
      // Revert state if there's an error deleting from the database
      setTopics((prevTopics) => [
        ...prevTopics,
        { id, title: "", description: "" },
      ]);
      setError("An error occurred while deleting the topic.");
    }
  };

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
        <div
          key={topic.id}
          className="group relative flex items-center w-full mb-4"
        >
          <button className="flex-grow text-lg font-medium text-left bg-transparent hover:bg-[#808080] hover:text-white py-2 px-4 rounded-md">
            {topic.title}
          </button>

          {/* Trash Icon */}
          <FaTrash
            onClick={() => handleDelete(topic.id)} // Calls the handleDelete function
            className="text-[#FA60D6] ml-2 cursor-pointer text-sm opacity-0 group-hover:opacity-100 transition-opacity transform hover:animate-shake"
          />
        </div>
      ))}
    </div>
  );
};
