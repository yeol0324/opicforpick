import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getWords } from "./get-words";
import type { WordFilterType } from "../model/types";
import { buildListKey } from "@shared/lib";

const wordKeys = {
  all: () => ["words"] as const,
  list: (filter?: WordFilterType) => buildListKey(wordKeys.all(), filter),
};

export const wordQueries = {
  list: (filter?: WordFilterType) =>
    queryOptions({
      queryKey: wordKeys.list(filter),
      queryFn: () => getWords(filter),
      staleTime: 60_000,
      placeholderData: keepPreviousData,
    }),
};
