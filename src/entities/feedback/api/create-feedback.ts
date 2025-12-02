import { supabase } from "@shared/api";
import type { FeedbackContent } from "../model/types";

interface CreateFeedbackParam {
  userId: string;
  sentenceId: string;
  transcript: string;
  feedback: FeedbackContent;
}

export async function createFeedback(params: CreateFeedbackParam) {
  const { data, error } = await supabase
    .from("ai_feedback")
    .insert({
      user_id: params.userId,
      sentence_id: params.sentenceId,
      transcript: params.transcript,
      feedback: params.feedback,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
