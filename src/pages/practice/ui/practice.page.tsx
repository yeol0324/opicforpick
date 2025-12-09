import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import type { ParagraphType } from "@entities/paragraph";
import { paragraphQueries } from "@entities/paragraph/api";

import { useDebouncedValue, THEME, APP, useInfiniteScroll } from "@shared/lib";
import {
  Spinner,
  ErrorMessage,
  EmptyState,
  SearchInput,
  Card,
} from "@shared/ui";



import { ParagraphListItem } from "./paragraph-list-item";
import { ParagraphSentenceList } from "./paragraph-sentence-list";

export function Practice() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedParagraphId, setSelectedParagraphId] = useState<string | null>(
    null
  );

  const [paragraphs, setParagraphs] = useState<ParagraphType[]>([]);

  const pageSize = APP.DEFAULT_PAGE_SIZE;
  const debouncedSearchTerm = useDebouncedValue(
    searchTerm,
    APP.DEFAULT_DEBOUNCE_DELAY
  );

  const paragraphsQuery = useQuery(
    paragraphQueries.list({
      q: debouncedSearchTerm,
      page,
      pageSize,
    })
  );

  const items = paragraphsQuery.data?.items ?? [];
  const total = paragraphsQuery.data?.total ?? 0;

  useEffect(() => {
    if (!items) return;

    setParagraphs((prev) => {
      if (page === 1) return items as ParagraphType[];
      return [...prev, ...(items as ParagraphType[])];
    });
  }, [items, page]);

  const isLoading = paragraphsQuery.isLoading && page === 1;
  const hasError = !!paragraphsQuery.error;
  const isEmpty = paragraphs.length === 0 && !isLoading;

  const hasMore = total > paragraphs.length;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
    setParagraphs([]);
  };

  const handleParagraphClick = (paragraphId: string) => {
    setSelectedParagraphId((prev) =>
      prev === paragraphId ? prev : paragraphId
    );
  };

  const containerRef = useInfiniteScroll({
    onLoadMore: () => {
      if (paragraphsQuery.isLoading || hasError || !hasMore) return;
      setPage((prev) => prev + 1);
    },
    enabled: !paragraphsQuery.isLoading && !hasError && hasMore,
  });

  return (
    <div
      className="p-6 space-y-4 h-screen flex flex-col overflow-hidden"
      style={{ ["--brand" as string]: THEME.BRAND }}
    >
      <div className="border p-4 mt-4 rounded-lg bg-gray-50 min-h-[200px]">
        {!selectedParagraphId ? (
          <EmptyState
            message="단락을 선택하면 문장이 표시됩니다"
            className="text-sm text-gray-500"
          />
        ) : (
          <ParagraphSentenceList paragraphId={selectedParagraphId} />
        )}
      </div>
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
          </>
        )}
      </div>
    </div>
  );
}
