import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { getParagraphWithSentences } from "@entities/paragraph";

import type { Paged } from "@shared/api";
import { buildListKey } from "@shared/lib";

import { getParagraphs } from "./get-paragraphs";
import type {
  ParagraphFilterType,
  ParagraphType,
} from "../model/paragraph.type";

const paragraphKeys = {
  all: () => ["paragraphs"] as const,
  list: (filter?: ParagraphFilterType) =>
    buildListKey(paragraphKeys.all(), filter),
  random: (type?: ParagraphType) =>
    [...paragraphKeys.all(), "random", type ?? "any"] as const,
  detail: (paragraphId: string) =>
    [...paragraphKeys.all(), paragraphId] as const,
  sentences: (paragraphId: string) =>
    [...paragraphKeys.detail(paragraphId), "sentences"] as const,
};

export const paragraphQueries = {
  list: (filter?: ParagraphFilterType) =>
    queryOptions({
      queryKey: paragraphKeys.list(filter),
      queryFn: () => getParagraphs(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),
  infiniteList: (filter?: Omit<ParagraphFilterType, "page">) => ({
    queryKey: paragraphKeys.list(filter),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getParagraphs({ ...filter, page: pageParam }),
    getNextPageParam: (
      lastPage: Paged<ParagraphType>,
      allPages: Paged<ParagraphType>[]
    ) => {
      const pageSize = filter?.pageSize ?? 20;
      const currentTotal = allPages.length * pageSize;
      return currentTotal < (lastPage.total ?? 0)
        ? allPages.length + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 60_000,
  }),
  sentences: (paragraphId: string) =>
    queryOptions({
      queryKey: paragraphKeys.sentences(paragraphId),
      queryFn: () => getParagraphWithSentences(paragraphId),
      staleTime: 60_000,
    }),
};
