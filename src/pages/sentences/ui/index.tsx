import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { sentenceQueries } from "@entities/sentence/api";
import type { SentenceType } from "@entities/sentence";
import { Spinner } from "@shared/ui";
import { useDebouncedValue, useInfiniteScroll, THEME, APP } from "@shared/lib";
import {
  SearchInput,
  SentenceTypeSelect,
  ErrorMessage,
  EmptyState,
} from "@shared/ui";

export function Sentences() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sentenceType, setSentenceType] = useState<SentenceType | undefined>(1);
  const pageSize = APP.DEFAULT_PAGE_SIZE;

  const debouncedSearchQuery = useDebouncedValue(
    searchQuery,
    APP.DEFAULT_DEBOUNCE_DELAY
  );

  const { queryKey, queryFn, getNextPageParam, initialPageParam } =
    sentenceQueries.infiniteList({
      q: debouncedSearchQuery,
      type: sentenceType,
      pageSize,
    });

  const infiniteQuery = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam,
    initialPageParam,
  });

  const sentences = useMemo(
    () => infiniteQuery.data?.pages.flatMap((page) => page.items) ?? [],
    [infiniteQuery.data]
  );

  const containerRef = useInfiniteScroll({
    onLoadMore: () => {
      if (infiniteQuery.hasNextPage && !infiniteQuery.isFetchingNextPage) {
        infiniteQuery.fetchNextPage();
      }
    },
    enabled: infiniteQuery.hasNextPage && !infiniteQuery.isFetchingNextPage,
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [debouncedSearchQuery, sentenceType]);

  const isLoading = infiniteQuery.isLoading && sentences.length === 0;
  const hasError = !!infiniteQuery.error;
  const isEmpty = sentences.length === 0 && !infiniteQuery.isLoading;

  return (
    <div
      className="p-6 space-y-4 h-screen flex flex-col overflow-hidden"
      style={{ ["--brand" as string]: THEME.BRAND }}
    >
      <div className="flex flex-wrap gap-2">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="검색어"
        />
        <SentenceTypeSelect value={sentenceType} onChange={setSentenceType} />
      </div>

      <div ref={containerRef} className="flex flex-col flex-1 overflow-y-auto">
        {isLoading ? (
          <Spinner />
        ) : hasError ? (
          <ErrorMessage />
        ) : (
          <>
            <ul className="list-disc list-none space-y-3">
              {sentences.map((sentence) => (
                <li
                  key={sentence.id}
                  className="pb-3 border-b border-slate-200 last:border-b-0"
                >
                  {sentence.sentence_eng}
                </li>
              ))}
            </ul>
            {infiniteQuery.isFetchingNextPage && (
              <div className="p-4 text-center">
                <Spinner />
              </div>
            )}
            {!infiniteQuery.hasNextPage && sentences.length > 0 && (
              <div className="p-4 text-center text-slate-500 text-sm">
                마지막
              </div>
            )}
            {isEmpty && <EmptyState message="문장이 없습니다" />}
          </>
        )}
      </div>
    </div>
  );
}
