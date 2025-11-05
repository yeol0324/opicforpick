import { useMutation } from "@tanstack/react-query";
import type { UseFeedbackParam } from "./types";
import { recognizeFromBlob } from "@entities/stt/api/sttFromBlob";
import { getFeedback } from "@entities/feedback/api/getFeedback";
import type { FeedbackResponse } from "@entities/feedback/model/types";

async function feedbackFlow(
  params: UseFeedbackParam
): Promise<FeedbackResponse> {
  const transcript = await recognizeFromBlob(params.audioBlob, "en-US");

  console.log(transcript);

  const feedback = await getFeedback({
    transcript,
    question: params.question,
    level: params.level,
  });

  return {
    ...feedback,
    rawTranscript: transcript,
  };
}

export function useFeedback() {
  const mutation = useMutation<FeedbackResponse, Error, UseFeedbackParam>({
    mutationFn: feedbackFlow,
  });

  return {
    feedback: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    submitFeedback: mutation.mutate,
    submitFeedbackAsync: mutation.mutateAsync,
    reset: mutation.reset,
  };
}
