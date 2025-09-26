import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getSentences } from "./get-sentences";
// import { getDetailPost } from "./get-detail-post";
// import { PostDetailQuery } from "./query/post.query";

export const sentenceQueries = {
  all: () => ["posts"],

  lists: () => [...sentenceQueries.all(), "list"],
  list: () =>
    queryOptions({
      queryKey: [...sentenceQueries.lists()],
      queryFn: () => getSentences(),
      placeholderData: keepPreviousData,
    }),

  // details: () => [...sentenceQueries.all(), "detail"],
  // detail: (query?: PostDetailQuery) =>
  //   queryOptions({
  //     queryKey: [...sentenceQueries.details(), query?.id],
  //     queryFn: () => getDetailPost({ id: query?.id }),
  //     staleTime: 5000,
  //   }),
};
