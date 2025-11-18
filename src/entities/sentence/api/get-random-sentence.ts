import { supabase, unwrap } from "@shared/api";
import type { Sentence, SentenceType } from "../model/types";

export async function getRandomSentence(
  type?: SentenceType
): Promise<Sentence | null> {
  let q = supabase.from("sentences").select("*").order("random()").limit(1);

  if (type) q = q.eq("type", type);

  const res = await q;
  const rows = unwrap<Sentence[]>(res);
  return rows[0] ?? null;
}
