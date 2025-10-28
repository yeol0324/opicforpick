import { queryOptions } from "@tanstack/react-query";
import { fetchDailySentence, type Level } from "./dailySentence";

const dailySentenceKeys = {
  all: () => ["daily-sentence"] as const,
  byLevel: (level: Level) => [...dailySentenceKeys.all(), level] as const,
};

/**
 * 오늘의 문장 쿼리 (하루에 하나)
 */
export const dailySentenceQuery = (level: Level = "Advanced") =>
  queryOptions({
    queryKey: dailySentenceKeys.byLevel(level),
    queryFn: () => fetchDailySentence(level),
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

export type { Level } from "./dailySentence";
