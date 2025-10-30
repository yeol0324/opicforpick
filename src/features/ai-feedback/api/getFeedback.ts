import { supabase } from "@shared/api/supabase";
import type { FeedbackRequest, FeedbackResponse } from "../model/types";

export async function getFeedback(
  params: FeedbackRequest
): Promise<FeedbackResponse> {
  const { transcript, referenceSentence, level } = params;

  const { data, error } = await supabase.functions.invoke("ai-feedback", {
    body: {
      transcript,
      referenceSentence,
      level,
    },
  });

  if (error) {
    console.error("[getFeedback] error", error);
    throw error;
  }

  return data as FeedbackResponse;
}
