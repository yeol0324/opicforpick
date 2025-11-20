import { supabase } from "@shared/api";
import type { FeedbackResponse } from "../model/types";

interface CreateFeedbackRecordParams {
  userId: string;
  sentenceId: string;
  transcript: string;
  feedback: FeedbackResponse;
}

export async function createFeedbackRecord(params: CreateFeedbackRecordParams) {
  const { data, error } = await supabase
    .from("ai_feedback")
    .insert({
      user_id: params.userId,
      sentence_id: params.sentenceId,
      transcript: params.feedback.transcript,
      feedback: params.feedback.result,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
