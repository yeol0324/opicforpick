import { useState } from 'react';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import type { ParagraphRow } from '@entities/paragraph';
import { paragraphQueries } from '@entities/paragraph/api';
import { useDebouncedValue, APP, useInfiniteScroll } from '@shared/lib';
import {
  Spinner,
  ErrorMessage,
  EmptyState,
  SearchInput,
  Card,
} from '@shared/ui';

import { ParagraphListItem } from './paragraph-list-item';
import { PracticeOverlay } from './practice.overlay';

export function Practice() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParagraphId, setSelectedParagraphId] = useState<string | null>(
    null,
  );

  const pageSize = APP.DEFAULT_PAGE_SIZE;
  const debouncedSearchTerm = useDebouncedValue(
    searchTerm,
    APP.DEFAULT_DEBOUNCE_DELAY,
  );

  const paragraphsQuery = useInfiniteQuery({
    ...paragraphQueries.infiniteList({ q: debouncedSearchTerm, pageSize }),
  });
  const paragraphs =
    paragraphsQuery.data?.pages
      .flatMap((page) => page.items as ParagraphRow[])
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.id === item.id),
      ) ?? [];

  const total = paragraphsQuery.data?.pages[0]?.total ?? 0;
  const isLoading = paragraphsQuery.isLoading;
  const hasError = !!paragraphsQuery.error;
  const isEmpty = paragraphs.length === 0 && !isLoading;
  const hasMore = paragraphsQuery.hasNextPage;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleParagraphClick = (paragraphId: string) => {
    setSelectedParagraphId((prev) =>
      prev === paragraphId ? prev : paragraphId,
    );
  };

  const onIntersect = () => {
    if (paragraphsQuery.isFetchingNextPage || hasError || !hasMore) return;
    paragraphsQuery.fetchNextPage();
  };
  const { setTarget } = useInfiniteScroll({
    onIntersect,
    enabled: !paragraphsQuery.isFetchingNextPage && !hasError && !!hasMore,
  });

  const paragraphSentencesQuery = useQuery({
    ...paragraphQueries.sentences(selectedParagraphId!),
    enabled: !!selectedParagraphId,
  });

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <h2 className="text-lg font-semibold text-slate-900">단어장 📕</h2>

      {paragraphSentencesQuery.isSuccess && paragraphSentencesQuery.data && (
        <PracticeOverlay
          practiceInfo={paragraphSentencesQuery.data}
          onClose={() => setSelectedParagraphId(null)}
        />
      )}

      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="검색어"
      />

      {isLoading ? (
        <Spinner />
      ) : hasError ? (
        <ErrorMessage />
      ) : (
        <>
          <div className="text-sm text-slate-600">총 {total}개</div>
          <Card className="min-h-0 flex-1 overflow-y-auto" mode="scroll">
            <ul className="list-none space-y-1">
              {paragraphs.map((paragraph) => (
                <ParagraphListItem
                  key={paragraph.id}
                  paragraph={paragraph}
                  isSelected={paragraph.id === selectedParagraphId}
                  onClick={() => handleParagraphClick(paragraph.id)}
                />
              ))}
            </ul>
            {isEmpty && <EmptyState message="단락이 없습니다" />}
            {paragraphsQuery.isFetchingNextPage && <Spinner />}
            <div ref={setTarget} className="h-10" />
          </Card>
        </>
      )}
    </div>
  );
}
