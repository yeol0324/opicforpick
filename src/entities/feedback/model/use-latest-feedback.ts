import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@entities/auth';
import { feedbackQueries } from '@entities/feedback';

export function useLatestFeedback(sentenceId?: string) {
  const { auth } = useAuthContext();
  const userId = auth.user?.id ?? null;

  return useQuery(feedbackQueries.latest(userId, sentenceId));
}
