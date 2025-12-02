import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { buildListKey } from "@shared/lib";
import type { Paged } from "@shared/api";
import { getParagraphsSentences } from "./get-paragraphs-sentences";
import type {
  ParagraphSentenceFilter,
  ParagraphSentenceWithSentence,
} from "../model/types";

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
  infiniteList: (filter: Omit<ParagraphSentenceFilter, "page">) => ({
    queryKey: paragraphSentencesKeys.list({ ...filter, page: 1 }),
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      getParagraphsSentences({ ...filter, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Paged<ParagraphSentenceWithSentence>) => {
      const nextPage = (lastPage.page ?? 1) + 1;
      return nextPage <= lastPage.pageCount ? nextPage : undefined;
    },
  }),
};
