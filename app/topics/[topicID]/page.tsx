import { supabaseClient } from "@/utils/supabase/client";
import ClientPage from "./ClientPage";

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

  return <ClientPage topicTitle={topic.title} />;
}
