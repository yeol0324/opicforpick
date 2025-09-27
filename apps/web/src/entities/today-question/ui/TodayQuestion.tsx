import { useQuery } from "@tanstack/react-query";
import { fetchRandomLine } from "@entities/today-question/queries/randomLine";

export function TodayQuestion({ theme }: { theme?: string }) {
  const {
    data: line,
    error,
    isPending,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["randomLine", { theme: theme ?? null }],
    queryFn: () => fetchRandomLine(theme),
    // 옵션
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isPending) return <p>로딩…</p>;
  if (error)
    return <p className="text-red-600">에러: {(error as Error).message}</p>;

  return (
    <section>
      <h3>오늘의 질문</h3>
      <p>
        {line?.qKo} <em>({line?.qEn})</em>
      </p>
      <h4>예시 답변</h4>
      <p>
        {line?.ko} <em>({line?.en})</em>
      </p>
      <button
        className="rounded bg-slate-200 px-3 py-2 hover:bg-slate-300 disabled:opacity-50"
        onClick={() => refetch()}
        disabled={isFetching}
      >
        {isFetching ? "다시 불러오는 중…" : "다시 뽑기"}
      </button>
    </section>
  );
}
