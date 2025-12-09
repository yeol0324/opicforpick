import {
  supabase,
  unwrap,
  calculatePagination,
  createPagedResult,
  type Paged,
} from "@shared/api";

import type { FeedbackType, FeedbackFilterType } from "../model/feedback.type";

export async function getFeedback(
  filter?: FeedbackFilterType
): Promise<Paged<FeedbackType>> {
  const { page, pageSize, from, to } = calculatePagination(
    filter?.page,
    filter?.pageSize
  );

  const queryBuilder = supabase
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
