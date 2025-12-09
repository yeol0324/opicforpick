import { supabase } from "@shared/api";
import type { FeedbackType, FeedbackContentType } from "../model/feedback.type";

interface CreateFeedbackParam {
  userId: string;
  sentenceId: string;
  recordingId: string;
  feedback: FeedbackContentType;
}

export async function createFeedback(
  params: CreateFeedbackParam
): Promise<FeedbackType> {
  const { data, error } = await supabase
    .from("ai_feedbacks")
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
