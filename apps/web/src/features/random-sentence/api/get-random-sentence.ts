import { supabase } from "@shared/api/supabase";
import { unwrap } from "@shared/api/supabase-helpers";
import type { Sentence, SentenceType } from "@entities/sentence/model/types";

export async function getRandomSentence(
  type?: SentenceType
): Promise<Sentence | null> {
  const { data, error } = await supabase.rpc("get_random_sentence", {
    type_filter: type ?? null,
  });
  const rows = unwrap<Sentence[]>({ data, error });
  return rows[0] ?? null;
}
