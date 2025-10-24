import { useInfiniteQuery } from "@tanstack/react-query"; // 👈 useInfiniteQuery로 변경
import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { sentenceQueries } from "@entities/sentence/api";
import type { SentenceType } from "@entities/sentence";
import { Spinner } from "@shared/ui/spinner";
import { useDebouncedValue } from "@shared/lib/debounce/useDebouncedValue";
import { THEME, APP } from "@shared/lib";

export function Sentences() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<SentenceType | undefined>(1);
  const pageSize = APP.DEFAULT_PAGE_SIZE;

  const listRef = useRef<HTMLDivElement>(null);
  const debouncedQ = useDebouncedValue(q, APP.DEFAULT_DEBOUNCE_DELAY);

  const { queryKey, queryFn, getNextPageParam, initialPageParam } =
    sentenceQueries.infiniteList({
      q: debouncedQ,
      type,
      pageSize,
    });

  const query = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam,
    initialPageParam,
  });

  const items = useMemo(
    () => query.data?.pages.flatMap((page) => page.items) ?? [],
    [query.data]
  );
  const isFetchingNextPage = query.isFetchingNextPage;
  const hasNextPage = query.hasNextPage;

  const handleScroll = useCallback(() => {
    const element = listRef.current;

    if (element) {
      const isAtBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 200;

      if (isAtBottom) {
        query.fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, query]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [debouncedQ, type]);

  return (
    <div
      className="p-6 space-y-4 h-screen flex flex-col overflow-hidden"
      style={{ ["--brand" as string]: THEME.BRAND }}
    >
      <div className="flex flex-wrap gap-2">
        <input
          className="border-2 border-[--brand] px-3 py-2 rounded-lg background focus:border-sky-500"
          placeholder="검색어"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
          }}
        />
        <select
          className="border-2 border-[--brand] px-3 py-2 rounded-lg focus:border-sky-500"
          value={type ?? ""}
          onChange={(e) => {
            setType((e.target.value || undefined) as SentenceType | undefined);
          }}
        >
          <option value="">전체 타입</option>
          <option value="0">question</option>
          <option value="1">answer</option>
          <option value="2">generic</option>
        </select>
      </div>

      <div
        ref={listRef}
        onScroll={handleScroll}
        className="flex flex-col flex-1 overflow-y-auto"
      >
        {query.isLoading && !items.length ? (
          <Spinner />
        ) : query.error ? (
          <p className="text-red-600">에러</p>
        ) : (
          <>
            <ul className="list-disc list-none space-y-3">
              {items.map((s) => (
                <li
                  key={s.id}
                  className="pb-3 border-b border-slate-200 last:border-b-0"
                >
                  {s.sentence_eng}
                </li>
              ))}
            </ul>
            {isFetchingNextPage && (
              <div className="p-4 text-center">
                <Spinner />
              </div>
            )}
            {!hasNextPage && items.length > 0 && (
              <div className="p-4 text-center text-slate-500 text-sm">
                마지막
              </div>
            )}
            {items.length === 0 && (
              <div className="p-4 text-center text-slate-500"></div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
