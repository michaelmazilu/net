import { supabaseClient } from "@/utils/supabase/client";
import GraphNetwork from "./GraphNetwork";

export default async function TopicPage({
  params,
}: {
  params: { topicID: string };
}) {
  const urlParams = await params;
  const { data: topic } = await supabaseClient
    .from("topics")
    .select("title")
    .eq("id", urlParams.topicID)
    .single();
  if (!topic) {
    return <div>Topic not found</div>;
  }

  return <GraphNetwork topicTitle={topic.title} topicId={urlParams.topicID} />;
}
