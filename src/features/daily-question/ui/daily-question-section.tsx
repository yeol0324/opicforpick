import type { SentenceRow } from "@entities/sentence/model/sentence.type";

import { Card, Spinner } from "@shared/ui";

interface Props {
  loading: boolean;
  error: unknown;
  sentence?: SentenceRow | null;
}

export function DailyQuestionSection({ loading, error, sentence }: Props) {
  return (
    <section className="space-y-4 w-full">
      <h2 className="text-lg font-semibold text-slate-900">오늘의 질문 💬</h2>
      <Card>
        <div className="min-h-[3.5rem]">
          {loading && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}

          {!loading && (error || !sentence) && (
            <p className="text-sm text-red-500">
              오늘의 문장을 가져오지 못했어요. 잠시 후 다시 시도해주세요.
            </p>
          )}

          {!loading && sentence && (
            <p className="text-base text-slate-900 leading-relaxed">
              {sentence.sentence_eng}
            </p>
          )}
        </div>
      </Card>
    </section>
  );
}
