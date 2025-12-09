import { useQuery } from "@tanstack/react-query";

import { sentenceQueries } from "@entities/sentence/api";

import type { ProficiencyLevel } from "@shared/lib";


export function useDailyQuestion(level: ProficiencyLevel = "Advanced") {
  const query = useQuery(sentenceQueries.daily(level));
  return query;
}
