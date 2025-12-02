import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getParagraphsSentences } from "./get-paragraphsSentences";
import type { ParagraphSentenceFilter } from "../model/types";
import { buildListKey } from "@shared/lib";

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
};
