import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getFeedback } from "./get-feedback";
import type { FeedbackFilter } from "../model/types";
import { getLatestFeedback } from "./get-latest-feedback";
import { buildListKey } from "@shared/lib";

const feedbackKeys = {
  all: () => ["feedback"] as const,
  list: (filter?: FeedbackFilter) => buildListKey(feedbackKeys.all(), filter),
  latest: () => [...feedbackKeys.all(), "latest"] as const,
};

export const feedbackQueries = {
  list: (filter?: FeedbackFilter) =>
    queryOptions({
      queryKey: feedbackKeys.list(filter),
      queryFn: () => getFeedback(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),
  latest: () =>
    queryOptions({
      queryKey: feedbackKeys.latest(),
      queryFn: () => getLatestFeedback("ddd"),
      staleTime: 60_000,
    }),
};
