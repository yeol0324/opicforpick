import { supabase } from "@shared/api";
import type { Feedback } from "../model/types";

type LatestFeedbackParams = {
  userId: string;
  sentenceId: string;
};

export async function getLatestFeedback({
  userId,
  sentenceId,
}: LatestFeedbackParams): Promise<Feedback> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const { data, error } = await supabase
    .from("ai_feedbacks")
    .select("*")
    .eq("user_id", userId)
    .eq("sentence_id", sentenceId)
    .gte("created_at", today.toISOString())
    .lt("created_at", tomorrow.toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}
