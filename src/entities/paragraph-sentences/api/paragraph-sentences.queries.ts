import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getParagraphsSentences } from "./get-paragraphsSentences";
import type { ParagraphSentenceFilter } from "../model/types";

const paragraphSentencesKeys = {
  all: () => ["paragraphsSentence"] as const,
  list: (f?: ParagraphSentenceFilter) =>
    [
      ...paragraphSentencesKeys.all(),
      "list",
      {
        paragraphId: f?.paragraphId ?? null,
        page: f?.page ?? 1,
        pageSize: f?.pageSize ?? 20,
      },
    ] as const,
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
