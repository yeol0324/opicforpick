import { supabase } from "@shared/api/supabase";
import { unwrap } from "@shared/api/supabase-helpers";
import {
  calculatePagination,
  createPagedResult,
  type Paged,
} from "@shared/lib";
import type { Paragraph, ParagraphFilter } from "../model/types";

export async function getParagraphs(
  filter?: ParagraphFilter
): Promise<Paged<Paragraph>> {
  const { page, pageSize, from, to } = calculatePagination(
    filter?.page,
    filter?.pageSize
  );

  let queryBuilder = supabase
    .from("paragraphs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filter?.q && filter.q.trim() !== "") {
    const searchKeyword = `%${filter.q.trim()}%`;
    queryBuilder = queryBuilder.ilike("title", searchKeyword);
  }

  const response = await queryBuilder.range(from, to);
  const items = unwrap<Paragraph[]>(response);
  const total = response.count ?? 0;

  return createPagedResult({
    items,
    total,
    page,
    pageSize,
  });
}
