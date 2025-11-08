import { useMutation } from "@tanstack/react-query";
import type { UseFeedbackParam } from "./types";
import { recognizeFromBlob } from "@entities/stt";
import { requestFeedback, type FeedbackResponse } from "@entities/feedback";
import { useAuthContext } from "@entities/auth";
import { createFeedbackRecord } from "@entities/feedback/api/createFeedbackRecord";

async function feedbackFlow(
  params: UseFeedbackParam & { userId: string | null }
): Promise<FeedbackResponse> {
  const transcript = await recognizeFromBlob(params.audioBlob, "en-US");

  const feedback = await requestFeedback({
    transcript,
    question: params.question.sentence_eng,
    level: params.level,
  });

  if (!params.userId) {
    throw new Error("로그인이 필요합니다.");
  }

  await createFeedbackRecord({
    userId: params.userId,
    sentenceId: params.question.id,
    transcript: transcript,
    feedback: feedback,
  });

  return {
    ...feedback,
    transcript: transcript,
  };
}

export function useFeedback() {
  const { auth } = useAuthContext();
  const userId = auth.user?.id ?? null;

  const mutation = useMutation<FeedbackResponse, Error, UseFeedbackParam>({
    mutationFn: (params) =>
      feedbackFlow({
        ...params,
        userId,
      }),
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
