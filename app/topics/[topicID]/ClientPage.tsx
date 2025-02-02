"use client";
import Graph from "@/components/Graph";
import { generateLearningPath } from "@/utils/api";
import { useEffect, useState } from "react";

interface ClientPageProps {
  topicTitle: string;
}

export default function ClientPage({ topicTitle }: ClientPageProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateContent = async () => {
      try {
        const data = await generateLearningPath(topicTitle);
        const cleanJson = data.choices[0].message.content
          .replace(/^```json\s*/, "") // Remove leading ```json
          .replace(/```$/, ""); // Remove trailing ```
        setContent(cleanJson);
        console.log(cleanJson);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    generateContent();
  }, [topicTitle]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1 min-h-screen">
      <div className="flex-1 h-screen bg-[#2d2d2d] p-4">
        <Graph content={content} />
      </div>
    </main>
  );
}
