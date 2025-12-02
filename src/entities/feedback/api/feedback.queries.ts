import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getFeedback } from "./get-feedback";
import type { FeedbackFilter } from "../model/types";

const feedbackKeys = {
  all: () => ["feedback"] as const,
  list: (f?: FeedbackFilter) =>
    [
      ...feedbackKeys.all(),
      "list",
      {
        q: f?.q ?? "",
        page: f?.page ?? 1,
        pageSize: f?.pageSize ?? 20,
      },
    ] as const,
};

export const feedbackQueries = {
  list: (filter?: FeedbackFilter) =>
    queryOptions({
      queryKey: feedbackKeys.list(filter),
      queryFn: () => getFeedback(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),
};
