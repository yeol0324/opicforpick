import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { buildListKey } from "@shared/lib";


import { getFeedback } from "./get-feedback";
import { getLatestFeedback } from "./get-latest-feedback";
import type { FeedbackFilterType } from "../model/feedback.type";

const feedbackKeys = {
  all: () => ["feedback"] as const,
  list: (filter?: FeedbackFilterType) => buildListKey(feedbackKeys.all(), filter),
  latest: (userId: string, sentenceId: string) =>
    [...feedbackKeys.all(), "latest", userId, sentenceId] as const,
};

export const feedbackQueries = {
  list: (filter?: FeedbackFilterType) =>
    queryOptions({
      queryKey: feedbackKeys.list(filter),
      queryFn: () => getFeedback(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),

  latest: (userId: string | null | undefined, sentenceId?: string) =>
    queryOptions({
      queryKey:
        userId && sentenceId
          ? feedbackKeys.latest(userId, sentenceId)
          : [...feedbackKeys.all(), "latest", "disabled"],
      queryFn: () => {
        if (!userId || !sentenceId) return Promise.resolve(null);
        return getLatestFeedback({ userId, sentenceId });
      },
      staleTime: 60_000,
      enabled: !!userId && !!sentenceId,
    }),
};
