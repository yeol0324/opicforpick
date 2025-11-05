import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getSentences } from "./get-sentences";
import { getRandomSentence } from "./get-random-sentence";
import { fetchDailySentence } from "./get-daily-sentence";
import type {
  Sentence,
  SentenceFilter,
  SentenceType,
  Level,
} from "../model/types";
import type { Paged } from "@shared/api";

const sentenceKeys = {
  all: () => ["sentences"] as const,
  list: (f?: SentenceFilter) =>
    [
      ...sentenceKeys.all(),
      "list",
      {
        type: f?.type ?? null,
        id: f?.id ?? null,
        q: f?.q ?? "",
        page: f?.page ?? 1,
        pageSize: f?.pageSize ?? 20,
      },
    ] as const,
  daily: () => ["daily-sentence"] as const,
  byLevel: (level: Level) => [...sentenceKeys.daily(), level] as const,
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

  infiniteList: (filter: Omit<SentenceFilter, "page">) => ({
    queryKey: sentenceKeys.list({ ...filter, page: 1 }),
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => {
      return getSentences({ ...filter, page: pageParam });
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage: Paged<Sentence>) => {
      const nextPage = (lastPage.page ?? 1) + 1;
      return nextPage <= lastPage.pageCount ? nextPage : undefined;
    },
  }),
  daily: (level: Level = "Advanced") =>
    queryOptions({
      queryKey: sentenceKeys.byLevel(level),
      queryFn: () => fetchDailySentence(level),
      staleTime: 24 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
    }),
  random: (type?: SentenceType) =>
    queryOptions({
      queryKey: sentenceKeys.random(type),
      queryFn: () => getRandomSentence(type),
    }),
};
