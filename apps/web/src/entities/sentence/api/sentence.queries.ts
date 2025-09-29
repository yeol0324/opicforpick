import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getSentences } from "./get-sentences";
import type { SentenceFilter } from "../model/types";

const sentenceKeys = {
  all: () => ["sentences"] as const,
  list: (f?: SentenceFilter) =>
    [
      ...sentenceKeys.all(),
      "list",
      {
        type: f?.type ?? null,
        q: f?.q ?? "",
        page: f?.page ?? 1,
        pageSize: f?.pageSize ?? 20,
      },
    ] as const,
};

export const sentenceQueries = {
  list: (filter?: SentenceFilter) =>
    queryOptions({
      queryKey: sentenceKeys.list(filter),
      queryFn: () => getSentences(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),
};
