import { queryOptions } from "@tanstack/react-query";
import { getRandomSentence } from "./get-random-sentence";
import type { SentenceType } from "@entities/sentence/model/types";

const randomKeys = {
  base: () => ["random-sentence"] as const,
  byType: (type?: SentenceType) =>
    [...randomKeys.base(), type ?? "any"] as const,
};

export const randomSentenceQuery = (type?: SentenceType) =>
  queryOptions({
    queryKey: randomKeys.byType(type),
    queryFn: () => getRandomSentence(type),
    staleTime: 0, // 매번 새로 뽑고 싶다면 0
    refetchOnWindowFocus: false,
  });
