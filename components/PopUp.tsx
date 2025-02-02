import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { LLMResponse } from "@/app/types";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface PopUpProps {
  llmData: LLMResponse;
  selectedNode: string | null;
  onClose: () => void;
}

export function PopUp({ llmData, selectedNode, onClose }: PopUpProps) {
  const [inputValue, setValue] = useState("");

  if (!selectedNode) return null;

  const lessonId = selectedNode.split("-")[1];
  let lesson:
    | { lessonId: number; lessonName: string; lesson: string }
    | undefined;

  llmData.units.forEach((unit) => {
    const found = unit.lessons.find((l) => l.lessonId === Number(lessonId));
    if (found) lesson = found;
  });

  if (!lesson) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in duration-300">
      <Card
        className="bg-[#1E1E1E] text-white border-[#B061FF] relative overflow-y-auto max-w-[70vw] 
          animate-in slide-in-from-bottom-10 duration-500"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <CardHeader className="p-8">
          <CardTitle className="text-3xl mb-6">{lesson.lessonName}</CardTitle>
        </CardHeader>
        <CardContent className="px-8 text-gray-400 text-lg whitespace-pre-wrap leading-relaxed">
          {lesson.lesson}
        </CardContent>
        <CardFooter className="p-8 pt-0">
          <Textarea
            value={inputValue}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask about this lesson..."
            className="h-14 text-lg bg-[#2a1a29] text-white border-2 border-[#B061FF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B061FF] p-3 scrollable pr-12"
          />
        </CardFooter>
      </Card>
    </div>
  );
}
