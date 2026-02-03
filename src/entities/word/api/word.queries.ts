import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import type { Paged } from '@shared/api';
import { buildListKey } from '@shared/lib';

import { getWords } from './get-words';
import type { WordFilterType, WordType } from '../model/word.type';

const wordKeys = {
  all: () => ['words'] as const,
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
  infiniteList: (filter?: Omit<WordFilterType, 'page'>) => ({
    queryKey: wordKeys.list(filter),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getWords({ ...filter, page: pageParam }),
    getNextPageParam: (
      lastPage: Paged<WordType>,
      allPages: Paged<WordType>[],
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
};
