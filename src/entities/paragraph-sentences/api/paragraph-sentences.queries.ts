import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import type { Paged } from "@shared/api";
import { buildListKey } from "@shared/lib";

import { getParagraphsSentences } from "./get-paragraphs-sentences";
import type {
  ParagraphSentenceFilterType,
  ParagraphSentenceWithSentenceType,
} from "../model/paragraph-sentences.type";



const paragraphSentencesKeys = {
  all: () => ["paragraphsSentence"] as const,
  list: (filter?: ParagraphSentenceFilter) =>
    buildListKey(paragraphSentencesKeys.all(), filter),
};

export const paragraphSentencesQueries = {
  list: (filter?: ParagraphSentenceFilter) =>
    queryOptions({
      queryKey: paragraphSentencesKeys.list(filter),
      queryFn: () => getParagraphsSentences(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),
  infiniteList: (filter: Omit<ParagraphSentenceFilterType, "page">) => ({
    queryKey: paragraphSentencesKeys.list({ ...filter, page: 1 }),
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      getParagraphsSentences({ ...filter, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Paged<ParagraphSentenceWithSentenceType>) => {
      const nextPage = (lastPage.page ?? 1) + 1;
      return nextPage <= lastPage.pageCount ? nextPage : undefined;
    },
  }),
};
