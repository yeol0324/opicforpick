import { supabase } from "@shared/api/supabase";
import { unwrap } from "@shared/api/supabase-helpers";
import type { Sentence, SentenceFilter, Paged } from "../model/types";

export async function getSentences(
  filter?: SentenceFilter
): Promise<Paged<Sentence>> {
  const page = Math.max(1, filter?.page ?? 1);
  const pageSize = Math.max(1, filter?.pageSize ?? 20);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let q = supabase
    .from("sentences")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filter?.type) {
    q = q.eq("type", filter.type);
  }
  if (filter?.q && filter.q.trim() !== "") {
    const kw = `%${filter.q.trim()}%`;
    q = q.or(`sentence_eng.ilike.${kw}`);
  }

  const res = await q.range(from, to);
  const items = unwrap<Sentence[]>(res);
  const total = res.count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return { items, total, page, pageSize, pageCount };
}
