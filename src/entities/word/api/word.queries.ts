import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { buildListKey } from "@shared/lib";

import { getWords } from "./get-words";
import type { WordFilterType } from "../model/word.type";


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
