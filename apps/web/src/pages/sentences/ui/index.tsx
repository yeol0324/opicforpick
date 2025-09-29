import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { sentenceQueries } from "@entities/sentence/api";
import type { SentenceType } from "@entities/sentence";
import { Spinner } from "@shared/ui/spinner";

export function Sentences() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<SentenceType | undefined>(1);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const debouncedQ = useDebouncedValue(q, 300);

  const query = useQuery(
    sentenceQueries.list({ q: debouncedQ, type, page, pageSize })
  );

  const { items, total, pageCount } = query.data ?? {
    items: [],
    total: 0,
    pageCount: 1,
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">문장 모음</h1>
      <div className="flex flex-wrap gap-2">
        <input
          className="border px-3 py-2 rounded-lg"
          placeholder="검색어"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border px-3 py-2 rounded-lg"
          value={type ?? ""}
          onChange={(e) => {
            setType((e.target.value || undefined) as SentenceType | undefined);
            setPage(1);
          }}
        >
          <option value="">전체 타입</option>
          <option value="0">question</option>
          <option value="1">answer</option>
          <option value="2">generic</option>
        </select>
      </div>

      {query.isLoading ? (
        <Spinner />
      ) : query.error ? (
        <p className="text-red-600">에러가 발생했어요</p>
      ) : (
        <>
          <div className="text-sm text-slate-600">총 {total}개</div>
          <ul className="list-disc pl-6">
            {items.map((s) => (
              <li key={s.id}>{s.sentence_eng}</li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              className="rounded px-3 py-2 border disabled:opacity-50"
              disabled={page <= 1 || query.isFetching}
              onClick={() => setPage((p) => p - 1)}
            >
              이전
            </button>
            <span className="text-sm">
              {page} / {pageCount}
            </span>
            <button
              className="rounded px-3 py-2 border disabled:opacity-50"
              disabled={page >= pageCount || query.isFetching}
              onClick={() => setPage((p) => p + 1)}
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function useDebouncedValue<T>(value: T, delay = 300): T {
  const [v, setV] = useState(value);
  useMemo(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}
