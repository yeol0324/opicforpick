import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getParagraphs } from "./get-paragraphs";
import type { ParagraphFilterType, ParagraphType } from "../model/paragraph.type";
import { buildListKey } from "@shared/lib";

const paragraphKeys = {
  all: () => ["paragraphs"] as const,
  list: (filter?: ParagraphFilterType) => buildListKey(paragraphKeys.all(), filter),
  random: (type?: ParagraphType) =>
    [...paragraphKeys.all(), "random", type ?? "any"] as const,
};

export const paragraphQueries = {
  list: (filter?: ParagraphFilterType) =>
    queryOptions({
      queryKey: paragraphKeys.list(filter),
      queryFn: () => getParagraphs(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),
};
