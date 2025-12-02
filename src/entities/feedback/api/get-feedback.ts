import {
  supabase,
  unwrap,
  calculatePagination,
  createPagedResult,
  type Paged,
} from "@shared/api";
import type { Feedback, FeedbackFilter } from "../model/types";

export async function getFeedback(
  filter?: FeedbackFilter
): Promise<Paged<Feedback>> {
  const { page, pageSize, from, to } = calculatePagination(
    filter?.page,
    filter?.pageSize
  );

  let queryBuilder = supabase
    .from("ai_feedback")
    .select("*, sentences(*)", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filter?.q && filter.q.trim() !== "") {
    const searchKeyword = `%${filter.q.trim()}%`;
    queryBuilder = queryBuilder.ilike("title", searchKeyword);
  }

  const response = await queryBuilder.range(from, to);
  const items = unwrap<Feedback[]>(response);
  const total = response.count ?? 0;

  return createPagedResult({
    items,
    total,
    page,
    pageSize,
  });
}
