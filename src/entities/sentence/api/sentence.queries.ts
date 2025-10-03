import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getSentences } from "./get-sentences";
import type { SentenceFilter, SentenceType } from "../model/types";
import { getRandomSentence } from "./get-random-sentence";

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

  random: (type?: SentenceType) =>
    ["sentences", "random", type ?? "any"] as const,
};

export const sentenceQueries = {
  list: (filter?: SentenceFilter) =>
    queryOptions({
      queryKey: sentenceKeys.list(filter),
      queryFn: () => getSentences(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),

  random: (type?: SentenceType) =>
    queryOptions({
      queryKey: sentenceKeys.random(type),
      queryFn: () => getRandomSentence(type),
    }),
};
