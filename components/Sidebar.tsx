"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { supabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { TbTrash, TbTrashOff } from "react-icons/tb";
import { Search } from "lucide-react";
import { Auth } from "./Auth";
import { User } from "@supabase/supabase-js";

interface Topic {
  id: string;
  title: string;
  description: string;
}

export const Sidebar: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

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

      const { data: topicsData, error } = await supabaseClient
        .from("topics")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) return;

      setTopics(topicsData);
      setFilteredTopics(topicsData);
    };

    if (user) fetchTopics();
  }, [user]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredTopics(topics);
    } else {
      const filtered = topics.filter((topic) =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTopics(filtered);
    }
  }, [searchQuery, topics]);

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
    }
  };

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
  };

  if (!user) {
    return (
      <div className="w-72 h-screen bg-[#1E1E1E] text-white flex flex-col items-start p-4 shadow-md font-poppins">
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

  return (
    <div className="w-72 h-screen bg-[#1E1E1E] text-white flex flex-col p-4 shadow-md font-poppins">
      <div className="w-full flex justify-center mb-6">
        <img
          src="/netlogo1.png"
          alt="Net Lessons Logo"
          className="max-w-[100px] h-auto cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>

      <div className="relative flex items-center w-full max-w-md p-2 bg-[#2A2A2A] border border-[#3E3E3E] rounded-lg mb-4">
        <Search className="w-5 h-5 text-[#A0A0A0] ml-2" />
        <input
          type="text"
          placeholder="Search Topics..."
          value={searchQuery}
          ref={searchInputRef}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-white placeholder-[#A0A0A0] focus:outline-none px-3"
        />
        <kbd className="absolute right-3 text-[#A0A0A0] bg-[#3E3E3E] px-2 py-1 rounded text-xs">
          ⌘K
        </kbd>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="group flex items-center w-full mb-4 hover:bg-[#2E2E2E] rounded-md"
            >
              <Button
                onClick={() => router.push(`/topics/${topic.id}`)}
                className="shadow-none flex-1 min-w-0 text-lg font-medium text-left bg-transparent hover:bg-transparent hover:text-white py-2 px-4"
              >
                <div className="overflow-hidden whitespace-nowrap pr-100">
                  {topic.title}
                </div>
              </Button>

              {hoveredTopic === topic.id ? (
                <TbTrashOff
                  onClick={() => handleDelete(topic.id)}
                  onMouseEnter={() => setHoveredTopic(topic.id)}
                  onMouseLeave={() => setHoveredTopic(null)}
                  className="text-[#B061FF] ml-4 cursor-pointer text-[20px] opacity-0 group-hover:opacity-100 transition-opacity transform"
                />
              ) : (
                <TbTrash
                  onClick={() => handleDelete(topic.id)}
                  onMouseEnter={() => setHoveredTopic(topic.id)}
                  onMouseLeave={() => setHoveredTopic(null)}
                  className="text-[#B061FF] ml-4 cursor-pointer text-[20px] opacity-0 group-hover:opacity-100 transition-opacity transform"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No topics found.</p>
        )}
      </div>

      <div className="w-full mt-4">
        <Button onClick={handleSignOut} variant="ghost" className="w-full">
          Sign Out
        </Button>
      </div>
    </div>
  );
};
