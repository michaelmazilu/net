import { LLMResponse, GraphData, GraphNode } from "@/app/types";
import { dummyGraphData } from "@/app/data/dummyGraphData";
import { supabaseClient } from "./supabase/client";
export async function organizeGraphData(content: string, topicId: string) {
  try {
    console.log(content);

    const data: LLMResponse = JSON.parse(content);
    data.topicId = topicId;
    console.log(data);

    const { error: updateError } = await supabaseClient
      .from("topics")
      .update({ body: data })
      .eq("id", topicId);

    if (updateError) {
      console.error("Error updating topic:", updateError);
    }

    return data;
  } catch (error) {
    console.error("Error organizing graph data:", error);
    return dummyGraphData;
  }
}
