import { Sentences } from "./Sentences";
import { sentenceApi } from "@entities/sentence";
import { useQuery } from "@tanstack/react-query";

export function MyNotes() {
  const { data, isFetching, isLoading } = useQuery(
    sentenceApi.sentenceQueries.list()
  );
  console.log(data, isFetching, isLoading);

  return (
    <>
      <Sentences sentences={data}></Sentences>
    </>
  );
}
