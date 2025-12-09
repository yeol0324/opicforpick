import { useQuery } from "@tanstack/react-query";
import { feedbackQueries } from "@entities/feedback";
import { useAuthContext } from "@entities/auth";

export function useLatestFeedback(sentenceId?: string) {
  const { auth } = useAuthContext();
  const userId = auth.user?.id ?? null;

  return useQuery(feedbackQueries.latest(userId, sentenceId));
}

