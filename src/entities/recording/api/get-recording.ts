import {
  supabase,
  unwrap,
  calculatePagination,
  createPagedResult,
  type Paged,
} from "@shared/api";
import type { Recording, RecordingFilter } from "../model/types";

export async function getRecording(
  filter?: RecordingFilter
): Promise<Paged<Recording>> {
  const { page, pageSize, from, to } = calculatePagination(
    filter?.page,
    filter?.pageSize
  );

  let queryBuilder = supabase
    .from("speech_recordings")
    .select("*, sentences(*), ai_feedbacks(*)", { count: "exact" })
    .order("created_at", { ascending: false });

  const response = await queryBuilder.range(from, to);
  const items = unwrap<Recording[]>(response);
  const total = response.count ?? 0;

  return createPagedResult({
    items,
    total,
    page,
    pageSize,
  });
}
