import { supabase, unwrap } from "@shared/api";
import type { UserWordType } from "../model/types";

export async function getUserWords(userId: string): Promise<UserWordType[]> {
  const { data, error } = await supabase
    .from("user_words")
    .select(
      `
      id,
      user_id,
      word_id,
      created_at,
      word:words (
        id,
        expression,
        meaning,
        created_at
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const rawItems = unwrap({ data, error });

  const items: UserWordType[] = rawItems.map((item) => ({
    ...item,
    word: Array.isArray(item.word) ? item.word[0] : item.word,
  }));

  return items;
}
