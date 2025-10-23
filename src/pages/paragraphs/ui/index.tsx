import { useQuery, useQueries } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { paragraphQueries } from "@entities/paragraph/api";
import type { SentenceType } from "@entities/sentence";
import { Spinner } from "@shared/ui/spinner";
import { paragraphSentencesQueries } from "@entities/paragraphSentences/api";
import { sentenceQueries } from "@entities/sentence/api";
import { useDebouncedValue } from "@shared/lib/debounce/useDebouncedValue";
import { THEME, APP } from "@shared/lib";

export function Paragraphs() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<SentenceType | undefined>(1);
  const [page, setPage] = useState(1);

  const [paragraphId, setParagraphId] = useState("");

  const pageSize = APP.DEFAULT_PAGE_SIZE;

  const debouncedQ = useDebouncedValue(q, APP.DEFAULT_DEBOUNCE_DELAY);

  const query = useQuery(
    paragraphQueries.list({ q: debouncedQ, page, pageSize })
  );

  const paragraphSentencesQuery = useQuery({
    ...paragraphSentencesQueries.list({ paragraphId }),
    enabled: !!paragraphId,
  });
  const sentenceItems = paragraphSentencesQuery.data?.items ?? [];

  const sentencesQueriesConfig = sentenceItems
    .toReversed()
    .map((item: any) => ({
      queryKey: sentenceQueries.list({ id: item.sentence_id }).queryKey,
      queryFn: sentenceQueries.list({ id: item.sentence_id }).queryFn,
      enabled: !!item.sentence_id,
    }));

  const sentencesResults = useQueries({ queries: sentencesQueriesConfig });

  const sentencesData = sentencesResults
    .filter((res) => res.isSuccess)
    .map((res) => res.data);

  const { items, total, pageCount } = query.data ?? {
    items: [],
    total: 0,
    pageCount: 1,
  };

  const handleTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setType(value === "" ? undefined : (Number(value) as SentenceType));
      setPage(1);
    },
    []
  );

  const handleQChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQ(e.target.value);
      setPage(1);
    },
    []
  );

  return (
    <div
      className="p-6 space-y-4 h-screen flex flex-col overflow-hidden"
      style={{ ["--brand" as string]: THEME.BRAND }}
    >
      <div className="flex flex-wrap gap-2">
        <input
          className="border-2 border-(--brand) px-3 py-2 rounded-lg background focus:border-sky-500"
          placeholder="검색어"
          value={q}
          onChange={handleQChange}
        />
        <select
          className="border-2 border-(--brand) px-3 py-2 rounded-lg focus:border-sky-500"
          value={type ?? ""}
          onChange={handleTypeChange}
        >
          <option value="">전체 타입</option>
          <option value={0}>question</option>
          <option value={1}>answer</option>
          <option value={2}>generic</option>
        </select>
      </div>

      <div className="border p-4 mt-4 rounded-lg bg-gray-50">
        {!paragraphId ? (
          <p className="text-sm text-gray-500">
            단락을 선택하면 문장이 표시됩니다.
          </p>
        ) : sentencesResults.some((res) => res.isLoading) ? (
          <Spinner />
        ) : sentencesResults.every((res) => res.isSuccess) ? (
          <ul className="list-disc list-inside space-y-1">
            {sentencesData.map((sentence, index) => (
              <li key={index} className="text-sm">
                {sentence.items[0].sentence_kor || ""}
                <p className="text-xs text-slate-500 ml-4">
                  {sentence.items[0].sentence_eng || ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-600">error</p>
        )}
      </div>

      {query.isLoading ? (
        <Spinner />
      ) : query.isError ? (
        <p className="text-red-600">에러</p>
      ) : (
        <>
          <div className="text-sm text-slate-600">총 {total}개</div>
          <ul className="list-disc list-none">
            {items.map((s) => (
              <li
                key={s.id}
                className="pb-3 cursor-pointer hover:bg-slate-100 p-2 rounded"
                onClick={() => setParagraphId(s.id)}
                style={{
                  backgroundColor:
                    s.id === paragraphId
                      ? "rgba(50, 182, 191, 0.1)"
                      : "transparent",
                  fontWeight: s.id === paragraphId ? "bold" : "normal",
                }}
              >
                {s.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
