import { supabase } from "@shared/api";
import type { Feedback, FeedbackContent } from "../model/types";

interface CreateFeedbackParam {
  userId: string;
  sentenceId: string;
  recordingId: string;
  feedback: FeedbackContent;
}

export async function createFeedback(
  params: CreateFeedbackParam
): Promise<Feedback> {
  const { data, error } = await supabase
    .from("ai_feedback")
    .insert({
      user_id: params.userId,
      sentence_id: params.sentenceId,
      feedback: params.feedback,
      recording_id: params.recordingId,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
