import { useQuery, useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { sentenceQueries } from "@entities/sentence/api";
import { paragraphSentencesQueries } from "@entities/paragraphSentences/api";
import { Spinner, ErrorMessage, EmptyState } from "@shared/ui";

type SentenceListProps = {
  paragraphId: string;
};

export function SentenceList({ paragraphId }: SentenceListProps) {
  const paragraphSentencesQuery = useQuery({
    ...paragraphSentencesQueries.list({ paragraphId }),
    enabled: !!paragraphId,
  });

  const paragraphSentenceItems = paragraphSentencesQuery.data?.items ?? [];

  const sentenceQueriesConfig = paragraphSentenceItems
    .toReversed()
    .map((item) => ({
      queryKey: sentenceQueries.list({ id: item.sentence_id }).queryKey,
      queryFn: sentenceQueries.list({ id: item.sentence_id }).queryFn,
      enabled: !!item.sentence_id,
    }));

  const sentencesResults = useQueries({ queries: sentenceQueriesConfig });

  const sentences = useMemo(() => {
    return sentencesResults
      .filter((result) => result.isSuccess)
      .map((result) => result.data?.items[0])
      .filter(
        (sentence): sentence is NonNullable<typeof sentence> => !!sentence
      );
  }, [sentencesResults]);

  const isLoadingParagraphSentences = paragraphSentencesQuery.isLoading;
  const isLoadingSentences = sentencesResults.some(
    (result) => result.isLoading
  );
  const isLoading = isLoadingParagraphSentences || isLoadingSentences;

  const hasError =
    paragraphSentencesQuery.isError ||
    sentencesResults.some((result) => result.isError);

  const isEmpty = sentences.length === 0 && !isLoading;

  if (isLoading) {
    return <Spinner />;
  }

  if (hasError) {
    return <ErrorMessage />;
  }

  if (isEmpty) {
    return <EmptyState message="문장이 없습니다" />;
  }

  return (
    <ul className="list-disc list-inside space-y-1">
      {sentences.map((sentence, index) => (
        <li key={`${sentence.id}-${index}`} className="text-sm">
          {sentence.sentence_kor || ""}
          <p className="text-xs text-slate-500 ml-4">
            {sentence.sentence_eng || ""}
          </p>
        </li>
      ))}
    </ul>
  );
}
