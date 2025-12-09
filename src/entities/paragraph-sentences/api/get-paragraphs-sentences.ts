import {
  supabase,
  unwrap,
  calculatePagination,
  createPagedResult,
  type Paged,
} from "@shared/api";
import type {
  ParagraphSentenceFilterType,
  ParagraphSentenceWithSentenceType,
} from "../model/paragraph-sentences.type";

export async function getParagraphsSentences(
  filter?: ParagraphSentenceFilterType
): Promise<Paged<ParagraphSentenceWithSentenceType>> {
  const { page, pageSize, from, to } = calculatePagination(
    filter?.page,
    filter?.pageSize
  );

  let queryBuilder = supabase
    .from("paragraph_sentences")
    .select("*, sentences(*)", { count: "exact" })
    .order("position", { ascending: false });

  if (filter?.paragraphId) {
    queryBuilder = queryBuilder.eq("paragraph_id", filter.paragraphId);
  }

  const response = await queryBuilder.range(from, to);
  const items = unwrap<ParagraphSentenceWithSentenceType[]>(response);
  const total = response.count ?? 0;

  return createPagedResult({
    items,
    total,
    page,
    pageSize,
  });
}
