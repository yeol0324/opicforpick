import { useQuery } from "@tanstack/react-query";
import { dailySentenceQuery } from "@entities/today-question/api/daily-sentence.queries";
import type { Level } from "@entities/today-question/model/types";
import { Spinner, ErrorMessage, EmptyState } from "@shared/ui";

type SentenceBoxProps = {
  level?: Level;
  title?: string;
};

export function SentenceBox({
  level = "Advanced",
  title = "오늘의 문장",
}: SentenceBoxProps) {
  const queryResult = useQuery(dailySentenceQuery(level));
  const { data: sentence, isLoading, error } = queryResult;

  if (isLoading) {
    return (
      <div className="rounded-xl p-4 space-y-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Spinner />
      </div>
    );
  }

  if (error) {
    console.error("[SentenceBox] Error:", error);
    return (
      <div className="rounded-xl p-4 space-y-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <ErrorMessage
          message={`에러: ${
            error instanceof Error ? error.message : "알 수 없는 오류"
          }`}
        />
      </div>
    );
  }

  if (sentence && sentence.sentence_eng) {
    return (
      <div className="rounded-xl p-4 space-y-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="text-base">{sentence.sentence_eng}</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-4 space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <EmptyState message="오늘의 문장이 없습니다." />
    </div>
  );
}
