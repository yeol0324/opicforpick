import { useQuery } from "@tanstack/react-query";
import { sentenceQueries } from "@entities/sentence/api";
import type { Level } from "@entities/sentence/model/types";

export function useDailyQuestion(level: Level = "Advanced") {
  const query = useQuery(sentenceQueries.daily(level));
  return query;
}
