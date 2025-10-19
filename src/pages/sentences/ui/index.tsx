import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { sentenceQueries } from "@entities/sentence/api";
import type { SentenceType } from "@entities/sentence";
import { Spinner } from "@shared/ui/spinner";
import { useDebouncedValue } from "@shared/lib/debounce/useDebouncedValue";

const BRAND = "#32B6BF";

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
  console.log(pageCount);
  /**TODO: 무한스크롤로 변경 */

  return (
    <div className="p-6 space-y-4" style={{ ["--brand" as string]: BRAND }}>
      <div className="flex flex-wrap gap-2">
        <input
          className="border-2 border-(--brand) px-3 py-2 rounded-lg background focus:border-sky-500"
          placeholder="검색어"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border-2 border-(--brand) px-3 py-2 rounded-lg focus:border-sky-500"
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
        <p className="text-red-600">에러</p>
      ) : (
        <>
          <div className="text-sm text-slate-600">총 {total}개</div>
          <ul className="list-disc list-none">
            {items.map((s) => (
              <li key={s.id} className="pb-3">
                {s.sentence_eng}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
