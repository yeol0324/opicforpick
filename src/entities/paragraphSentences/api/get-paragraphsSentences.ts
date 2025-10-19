import { supabase } from "@shared/api/supabase";
import { unwrap } from "@shared/api/supabase-helpers";
import type {
  ParagraphSentence,
  ParagraphSentenceFilter,
  Paged,
} from "../model/types";

export async function getParagraphsSentences(
  filter?: ParagraphSentenceFilter
): Promise<Paged<ParagraphSentence>> {
  const page = Math.max(1, filter?.page ?? 1);
  const pageSize = Math.max(1, filter?.pageSize ?? 20);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let q = supabase
    .from("paragraph_sentences")
    .select("*", { count: "exact" })
    .order("position", { ascending: false });

  if (filter?.paragraphId) {
    q = q.eq("paragraph_id", filter.paragraphId);
  }

  const res = await q.range(from, to);
  const items = unwrap<ParagraphSentence[]>(res);
  const total = res.count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return { items, total, page, pageSize, pageCount };
}
