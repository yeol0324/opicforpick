import { supabase, unwrap } from "@shared/api";

import type { SentenceType, SentenceKindType } from "../model/sentence.type";

export async function getRandomSentence(
  type?: SentenceKindType
): Promise<SentenceType | null> {
  let q = supabase.from("sentences").select("*").order("random()").limit(1);

  if (type) q = q.eq("type", type);

  const res = await q;
  const rows = unwrap<SentenceType[]>(res);
  return rows[0] ?? null;
}
