import { queryOptions } from "@tanstack/react-query";
import { getSentences } from "./get-sentences";
// import { getDetailPost } from "./get-detail-post";
// import { PostDetailQuery } from "./query/post.query";

export const sentenceQueries = {
  all: () => ["sentences"],
  lists: () => [...sentenceQueries.all(), "list"],
  list: () =>
    queryOptions({
      queryKey: [...sentenceQueries.lists()],
      queryFn: () => getSentences(),
    }),
};
