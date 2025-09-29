import { sentenceApi, SentenceList } from "@entities/sentence";
import { Spinner } from "@shared/ui/spinner";
import { useQuery } from "@tanstack/react-query";

export function Sentences() {
  const { data, isFetching, isLoading } = useQuery(
    sentenceApi.sentenceQueries.list()
  );

  console.log(data, isFetching, isLoading);
  if (isLoading) return <Spinner />;
  return (
    <>
      <SentenceList sentences={data?.items}></SentenceList>
    </>
  );
}
