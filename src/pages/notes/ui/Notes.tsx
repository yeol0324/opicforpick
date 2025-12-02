import { feedbackQueries } from "@entities/feedback/api/feedback.queries";
import { useQuery } from "@tanstack/react-query";

export function Notes() {
  const feedbackQuery = useQuery({
    ...feedbackQueries.list(),
  });
  const feedbackItems = feedbackQuery.data?.items ?? [];

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">나의 기록 💡</h2>
      </section>
      {feedbackItems && (
        <ul>
          {feedbackItems.map((item, idx) => (
            <li key={item.id}>
              <p>{item.sentences.sentence_eng}</p>
              <p>{item.sentences.created_at}</p>
              <p>{item.feedback.contentScore}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
