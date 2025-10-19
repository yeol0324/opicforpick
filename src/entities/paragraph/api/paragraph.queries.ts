import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getParagraphs } from "./get-paragraphs";
import type { ParagraphFilter, Paragraph } from "../model/types";

const paragraphKeys = {
  all: () => ["paragraphs"] as const,
  list: (f?: ParagraphFilter) =>
    [
      ...paragraphKeys.all(),
      "list",
      {
        type: f?.themeId ?? null,
        q: f?.q ?? "",
        page: f?.page ?? 1,
        pageSize: f?.pageSize ?? 20,
      },
    ] as const,

  random: (type?: Paragraph) => ["sentences", "random", type ?? "any"] as const,
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
