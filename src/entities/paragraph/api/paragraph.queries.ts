import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getParagraphs } from "./get-paragraphs";
import type { ParagraphFilter, Paragraph } from "../model/types";
import { buildListKey } from "@shared/lib";

const paragraphKeys = {
  all: () => ["paragraphs"] as const,
  list: (filter?: ParagraphFilter) => buildListKey(paragraphKeys.all(), filter),
  random: (type?: Paragraph) =>
    [...paragraphKeys.all(), "random", type ?? "any"] as const,
};

export const paragraphQueries = {
  list: (filter?: ParagraphFilter) =>
    queryOptions({
      queryKey: paragraphKeys.list(filter),
      queryFn: () => getParagraphs(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),
};
