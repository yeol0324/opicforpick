import { useQuery } from "@tanstack/react-query";
import { randomSentenceQuery } from "../api/random.queries";
import type { SentenceType } from "@entities/sentence/model/types";
import { Spinner } from "@shared/ui/spinner";

type Props = {
  type?: SentenceType;
  title?: string;
};

export function RandomSentenceBox({ type, title = "오늘의 문장" }: Props) {
  const { data, isLoading, error } = useQuery(randomSentenceQuery(type));

  return (
    <div className="rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {/* <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded bg-blue-600 px-3 py-1.5 text-white disabled:opacity-50"
        >
          {isFetching ? "뽑는 중" : "다시 뽑기"}
        </button> */}
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-600">에러</p>
      ) : data ? (
        <div className="text-base">{data.sentence_eng}</div>
      ) : (
        <p className="text-slate-500">문장이 없어요</p>
      )}
    </div>
  );
}
