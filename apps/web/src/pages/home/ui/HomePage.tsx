import { Recorder } from "@shared/ui/recorder";
import { TodayQuestion } from "@entities/today-question";
import { SentenceItem } from "@entities/sentence";
import { useQuery } from "@tanstack/react-query";
import { sentenceQueries } from "@entities/sentence/api";

export function HomePage() {
  const { data, isLoading, error } = useQuery(
    sentenceQueries.list({ type: 1 })
  );
  console.log(isLoading, error);
  return (
    <>
      <TodayQuestion theme="hobby" />
      {data && <SentenceItem sentence={data.items[0]}></SentenceItem>}
      <Recorder maxSeconds={300} />
    </>
  );
}
