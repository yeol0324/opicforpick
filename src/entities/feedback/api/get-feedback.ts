import {
  supabase,
  unwrap,
  calculatePagination,
  createPagedResult,
  type Paged,
} from "@shared/api";
import type { FeedbackType, FeedbackFilter } from "../model/types";

export async function getFeedback(
  filter?: FeedbackFilter
): Promise<Paged<FeedbackType>> {
  const { page, pageSize, from, to } = calculatePagination(
    filter?.page,
    filter?.pageSize
  );

  let queryBuilder = supabase
    .from("ai_feedbacks")
    .select("*, sentences(*)", { count: "exact" })
    .order("created_at", { ascending: false });

  const response = await queryBuilder.range(from, to);
  const items = unwrap<FeedbackType[]>(response);
  const total = response.count ?? 0;

  return createPagedResult({
    items,
    total,
    page,
    pageSize,
  });
}
