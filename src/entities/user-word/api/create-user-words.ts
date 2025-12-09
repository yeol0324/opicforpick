// src/entities/user-word/api/create-user-words.ts
import { supabase, unwrap } from "@shared/api";
import type { UserWordType } from "../model/user-word.type";

export async function createUserWords(
  userId: string,
  wordIds: number[]
): Promise<UserWordType[]> {
  if (wordIds.length === 0) {
    return [];
  }

  const rows = wordIds.map((wordId) => ({
    user_id: userId,
    word_id: wordId,
  }));

  const { data, error } = await supabase
    .from("user_words")
    .upsert(rows, {
      onConflict: "user_id,word_id",
    })
    .select("id, user_id, word_id, created_at");

  const items = unwrap<UserWordType[]>({ data, error });
  return items;
}
