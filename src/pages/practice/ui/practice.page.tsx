import { useState } from "react";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import type { ParagraphType } from "@entities/paragraph";
import { paragraphQueries } from "@entities/paragraph/api";

import { useDebouncedValue, APP, useInfiniteScroll } from "@shared/lib";
import {
  Spinner,
  ErrorMessage,
  EmptyState,
  SearchInput,
  Card,
} from "@shared/ui";

import { ParagraphListItem } from "./paragraph-list-item";
import { PracticeOverlay } from "./practice.overlay";

export function Practice() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParagraphId, setSelectedParagraphId] = useState<string | null>(
    null
  );

  const pageSize = APP.DEFAULT_PAGE_SIZE;
  const debouncedSearchTerm = useDebouncedValue(
    searchTerm,
    APP.DEFAULT_DEBOUNCE_DELAY
  );

  const paragraphsQuery = useInfiniteQuery({
    ...paragraphQueries.infiniteList({ q: debouncedSearchTerm, pageSize }),
  });
  const paragraphs =
    paragraphsQuery.data?.pages
      .flatMap((page) => page.items as ParagraphType[])
      .filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
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
      prev === paragraphId ? prev : paragraphId
    );
  };

  const containerRef = useInfiniteScroll({
    onLoadMore: () => {
      if (paragraphsQuery.isFetchingNextPage || hasError || !hasMore) return;
      paragraphsQuery.fetchNextPage();
    },
    enabled: !paragraphsQuery.isFetchingNextPage && !hasError && !!hasMore,
  });

  const paragraphSentencesQuery = useQuery({
    ...paragraphQueries.sentences(selectedParagraphId!),
    enabled: !!selectedParagraphId,
  });
  console.log(paragraphSentencesQuery.data);

  return (
    <div className="flex flex-col items-center gap-6 p-6 overflow-hidden">
      {/* <section className="space-y-4 w-full"> */}
      <h2 className="text-lg font-semibold text-slate-900">단어장 📕</h2>
      {paragraphSentencesQuery.isSuccess && paragraphSentencesQuery.data && (
        <PracticeOverlay
          practiceInfo={paragraphSentencesQuery.data}
          onClose={() => setSelectedParagraphId(null)}
        />
      )}

      <div className="flex flex-wrap gap-2">
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="검색어"
        />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto" ref={containerRef}>
        {isLoading ? (
          <Spinner />
        ) : hasError ? (
          <ErrorMessage />
        ) : (
          <>
            <div className="text-sm text-slate-600 mb-2">총 {total}개</div>
            <Card>
              <ul className="list-disc list-none space-y-1">
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
            </Card>
            {paragraphsQuery.isFetchingNextPage && (
              <div className="py-4">
                <Spinner />
              </div>
            )}
          </>
        )}
      </div>
      {/* </section> */}
    </div>
  );
}
