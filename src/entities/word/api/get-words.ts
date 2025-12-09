import {
  supabase,
  unwrap,
  calculatePagination,
  createPagedResult,
  type Paged,
} from "@shared/api";

import type { WordType, WordFilterType } from "../model/word.type";

export async function getWords(
  filter?: WordFilterType
): Promise<Paged<WordType>> {
  const { page, pageSize, from, to } = calculatePagination(
    filter?.page,
    filter?.pageSize
  );

  let queryBuilder = supabase
    .from("words")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  const q = filter?.q?.trim();
  if (q) {
    const searchKeyword = `%${q}%`;
    queryBuilder = queryBuilder.or(
      `expression.ilike.${searchKeyword},meaning.ilike.${searchKeyword}`
    );
  }

  const response = await queryBuilder.range(from, to);
  const items = unwrap<WordType[]>(response);
  const total = response.count ?? 0;

  return createPagedResult({
    items,
    total,
    page,
    pageSize,
  });
}
