import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getSentences } from "./get-sentences";
import { getRandomSentence } from "./get-random-sentence";
import { fetchDailySentence } from "./get-daily-sentence";
import type { SentenceType, SentenceFilterType, SentenceKindType } from "../model/sentence.type";
import type { Paged } from "@shared/api";
import { buildListKey, type ProficiencyLevel } from "@shared/lib";

const sentenceKeys = {
  all: () => ["sentences"] as const,
  list: (filter?: SentenceFilterType) => buildListKey(sentenceKeys.all(), filter),
  byId: (id: string) => [...sentenceKeys.all(), "detail", id] as const,
  daily: () => ["daily-sentence"] as const,
  byLevel: (level: ProficiencyLevel) =>
    [...sentenceKeys.daily(), level] as const,
  random: (type?: SentenceKindType) =>
    ["sentences", "random", type ?? "any"] as const,
};

export const sentenceQueries = {
  list: (filter?: SentenceFilterType) =>
    queryOptions({
      queryKey: sentenceKeys.list(filter),
      queryFn: () => getSentences(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),

  infiniteList: (filter: Omit<SentenceFilterType, "page">) => ({
    queryKey: sentenceKeys.list({ ...filter, page: 1 }),
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => {
      return getSentences({ ...filter, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: Paged<SentenceType>) => {
      const nextPage = (lastPage.page ?? 1) + 1;
      return nextPage <= lastPage.pageCount ? nextPage : undefined;
    },
  }),

  byId: (id: string) =>
    queryOptions({
      queryKey: sentenceKeys.byId(id),
      queryFn: async () => {
        const result = await getSentences({
          id,
          page: 1,
          pageSize: 1,
        });
        return result.items[0] ?? null;
      },
      enabled: !!id,
    }),
  daily: (level: ProficiencyLevel = "Advanced") =>
    queryOptions({
      queryKey: sentenceKeys.byLevel(level),
      queryFn: () => fetchDailySentence(level),
      staleTime: 24 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
    }),
  random: (type?: SentenceKindType) =>
    queryOptions({
      queryKey: sentenceKeys.random(type),
      queryFn: () => getRandomSentence(type),
    }),
};
