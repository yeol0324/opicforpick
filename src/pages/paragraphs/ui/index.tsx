import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { paragraphQueries } from "@entities/paragraph/api";
import { Spinner, ErrorMessage, EmptyState, SearchInput } from "@shared/ui";
import { useDebouncedValue, THEME, APP } from "@shared/lib";
import { SentenceList } from "./SentenceList";
import { ParagraphListItem } from "./ParagraphListItem";

export function Paragraphs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedParagraphId, setSelectedParagraphId] = useState("");

  const pageSize = APP.DEFAULT_PAGE_SIZE;
  const debouncedSearchQuery = useDebouncedValue(
    searchQuery,
    APP.DEFAULT_DEBOUNCE_DELAY
  );

  const paragraphsQuery = useQuery(
    paragraphQueries.list({
      q: debouncedSearchQuery,
      page: currentPage,
      pageSize,
    })
  );

  const { items: paragraphs, total } = paragraphsQuery.data ?? {
    items: [],
    total: 0,
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleParagraphClick = (paragraphId: string) => {
    setSelectedParagraphId(paragraphId);
  };

  const isLoading = paragraphsQuery.isLoading;
  const hasError = !!paragraphsQuery.error;
  const isEmpty = paragraphs.length === 0 && !isLoading;

  return (
    <div
      className="p-6 space-y-4 h-screen flex flex-col overflow-hidden"
      style={{ ["--brand" as string]: THEME.BRAND }}
    >
      <div className="flex flex-wrap gap-2">
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="검색어"
        />
      </div>

      <div className="border p-4 mt-4 rounded-lg bg-gray-50 min-h-[200px]">
        {!selectedParagraphId ? (
          <EmptyState
            message="단락을 선택하면 문장이 표시됩니다"
            className="text-sm text-gray-500"
          />
        ) : (
          <SentenceList paragraphId={selectedParagraphId} />
        )}
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        {isLoading ? (
          <Spinner />
        ) : hasError ? (
          <ErrorMessage />
        ) : (
          <>
            <div className="text-sm text-slate-600 mb-2">총 {total}개</div>
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
          </>
        )}
      </div>
    </div>
  );
}
