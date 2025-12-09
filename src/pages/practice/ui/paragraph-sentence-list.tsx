import { useMemo } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { sentenceApi } from "@entities/paragraph-sentences";

import { EmptyState, ErrorMessage, Spinner } from "@shared/ui";


type ParagraphSentenceListProps = {
  paragraphId: string | null;
};

export function ParagraphSentenceList({
  paragraphId,
}: ParagraphSentenceListProps) {
  const pageSize = 20;
  const hasParagraph = !!paragraphId;

  // ✅ 항상 한 번만 호출, paragraphId 없을 땐 더미 값("") 넣기
  const { queryKey, queryFn, getNextPageParam, initialPageParam } =
    sentenceApi.paragraphSentencesQueries.infiniteList({
      paragraphId: paragraphId ?? "", // enabled: false일 땐 실제로 안 쓰임
      pageSize,
    });

  const infiniteQuery = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam,
    initialPageParam,
    enabled: hasParagraph, // paragraphId 없으면 아예 쿼리 안 돔
  });

  const items = useMemo(
    () => infiniteQuery.data?.pages.flatMap((page) => page.items) ?? [],
    [infiniteQuery.data]
  );

  const sentences = useMemo(
    () =>
      items
        .map((item) => item.sentences)
        .filter((s): s is NonNullable<typeof s> => !!s && !!s.id),
    [items]
  );

  const { hasNextPage, isFetchingNextPage, isLoading, isError } = infiniteQuery;

  const isLoadingFirstPage = isLoading && sentences.length === 0;
  const isEmpty = !isLoading && sentences.length === 0;

  // ✅ 훅 호출 다 끝난 다음에 조건부 렌더
  if (!hasParagraph) {
    return (
      <EmptyState
        message="단락이 선택되지 않았습니다"
        className="text-sm text-gray-500"
      />
    );
  }

  if (isLoadingFirstPage) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (isEmpty) {
    return <EmptyState message="문장이 없습니다" />;
  }

  return (
    <div className="max-h-80 overflow-y-auto pr-2">
      <ul className="list-disc list-inside space-y-1">
        {sentences.map((sentence) => (
          <li key={sentence.id} className="text-sm">
            {sentence.sentence_kor || ""}
            <p className="text-xs text-slate-500 ml-4">
              {sentence.sentence_eng || ""}
            </p>
          </li>
        ))}
      </ul>

      {isFetchingNextPage && (
        <div className="py-3 text-center">
          <Spinner />
        </div>
      )}

      {!hasNextPage && sentences.length > 0 && (
        <div className="py-2 text-center text-xs text-slate-400">
          마지막입니다
        </div>
      )}
    </div>
  );
}
