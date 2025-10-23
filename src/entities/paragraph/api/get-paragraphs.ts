import { supabase } from "@shared/api/supabase";
import { unwrap } from "@shared/api/supabase-helpers";
import { APP, type Paged } from "@shared/lib";
import type { Paragraph, ParagraphFilter } from "../model/types";

export async function getParagraphs(
  filter?: ParagraphFilter
): Promise<Paged<Paragraph>> {
  const page = Math.max(1, filter?.page ?? 1);
  const pageSize = Math.max(1, filter?.pageSize ?? APP.DEFAULT_PAGE_SIZE);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let q = supabase
    .from("paragraphs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  const res = await q.range(from, to);
  const items = unwrap<Paragraph[]>(res);
  const total = res.count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return { items, total, page, pageSize, pageCount };
}
