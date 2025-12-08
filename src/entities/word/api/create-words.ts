import { supabase, unwrap } from "@shared/api";
import type { WordType, WordCandidate } from "../model/types";

export async function createWords(
  candidates: WordCandidate[]
): Promise<WordType[]> {
  if (candidates.length === 0) {
    return [];
  }

  // 중복 expression 제거
  const uniqueMap = new Map<string, WordCandidate>();
  candidates.forEach((item) => {
    const key = item.expression.trim().toLowerCase();
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    }
  });
  const uniqueCandidates = Array.from(uniqueMap.values());

  const { data, error } = await supabase
    .from("words")
    .upsert(
      uniqueCandidates.map((item) => ({
        expression: item.expression,
        meaning: item.meaning,
      })),
      {
        onConflict: "expression",
      }
    )
    .select("*");

  const items = unwrap<WordType[]>({ data, error });

  return items;
}
