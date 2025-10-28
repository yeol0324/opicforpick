import { useQuery } from "@tanstack/react-query";
import {
  dailySentenceQuery,
  type Level,
} from "@entities/today-question/queries/dailySentence.queries";
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

  console.log("[SentenceBox] Query state:", {
    status: queryResult.status,
    isLoading,
    isSuccess: queryResult.isSuccess,
    isError: queryResult.isError,
    error: error
      ? error instanceof Error
        ? error.message
        : String(error)
      : null,
    data: sentence,
    dataType: typeof sentence,
    isNull: sentence === null,
    isUndefined: sentence === undefined,
    isTruthy: !!sentence,
    hasSentenceEng: sentence ? "sentence_eng" in sentence : false,
    sentenceEngValue:
      sentence && "sentence_eng" in sentence ? sentence.sentence_eng : "N/A",
    allKeys: sentence ? Object.keys(sentence) : [],
  });

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

  if (sentence !== null && sentence !== undefined) {
    const sentenceText =
      ("sentence_eng" in sentence && sentence.sentence_eng) ||
      ("sentenceEng" in sentence && sentence.sentenceEng) ||
      ("text" in sentence && sentence.text) ||
      ("content" in sentence && sentence.content) ||
      null;

    if (sentenceText) {
      return (
        <div className="rounded-xl p-4 space-y-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="text-base">{String(sentenceText)}</div>
        </div>
      );
    }

    console.warn("[SentenceBox] Sentence exists but no text field found:", {
      sentence,
      keys: Object.keys(sentence),
      allValues: Object.entries(sentence),
    });

    return (
      <div className="rounded-xl p-4 space-y-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <EmptyState message="문장 데이터 형식이 올바르지 않습니다" />
      </div>
    );
  }

  return (
    <div className="rounded-xl p-4 space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <EmptyState message="문장이 없습니다" />
    </div>
  );
}
