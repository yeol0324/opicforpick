import { recordingQueries } from "@entities/recording";
import { YYYYMMDDHHmm } from "@shared/lib/time/formatDateTime";
import { Card } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";

export function Notes() {
  const recordingQuery = useQuery({
    ...recordingQueries.list(),
  });
  const feedbackItems = recordingQuery.data?.items ?? [];

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <section className="space-y-4 w-full">
        <h2 className="text-lg font-semibold text-slate-900">나의 기록 💡</h2>

        <Card>
          {feedbackItems && (
            <ul>
              {feedbackItems.map((item, idx) => (
                <li key={item.id}>
                  <p>{item.sentences.sentence_eng}</p>
                  <p>{YYYYMMDDHHmm(item.sentences.created_at)}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </div>
  );
}
