import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@entities/auth";
import { createFeedback } from "@entities/feedback";
import type { UseFeedbackParam, FeedbackResponse } from "./types";
import { requestFeedback } from "./requestFeedback";
import { createRecording, uploadRecording } from "@entities/recording";

async function feedbackFlow(
  params: UseFeedbackParam & { userId: string | null }
): Promise<FeedbackResponse> {
  if (!params.userId) throw new Error("로그인이 필요합니다.");

  const feedback = await requestFeedback({
    audio: params.audioBlob,
    question: params.question.sentence_eng,
    level: params.level,
  });

  const audioPath = await uploadRecording({
    userId: params.userId,
    sentenceId: params.question.id,
    blob: params.audioBlob,
  });

  await createRecording({
    userId: params.userId,
    sentenceId: params.question.id,
    audioUrl: audioPath,
    durationMs: 0,
  });

  await createFeedback({
    userId: params.userId,
    sentenceId: params.question.id,
    transcript: "transcript",
    feedback: feedback.result,
  });

  return {
    ...feedback,
    transcript: "transcript",
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
