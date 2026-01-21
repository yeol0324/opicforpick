import {
  supabase,
  unwrap,
  calculatePagination,
  createPagedResult,
  type Paged,
} from "@shared/api";

import type {
  ParagraphFilterType,
  ParagraphRow,
} from "../model/paragraph.type";

/**
 * Fetches a paginated list of paragraph rows with optional title text filtering.
 *
 * The returned page is ordered by `created_at` descending. If `filter.q` is provided,
 * it is used as a case-insensitive partial match against the `title` column.
 *
 * @param filter - Optional filters: `page` and `pageSize` control pagination, `q` is a search term for title matching
 * @returns A paged result containing the matching `ParagraphRow` items, the total match count, and pagination info
 */
export async function getParagraphs(
  filter?: ParagraphFilterType
): Promise<Paged<ParagraphRow>> {
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
  const items = unwrap<ParagraphRow[]>(response);
  const total = response.count ?? 0;

  return createPagedResult({
    items,
    total,
    page,
    pageSize,
  });
}