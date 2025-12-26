import {
  supabase,
  unwrap,
  calculatePagination,
  createPagedResult,
  type Paged,
} from "@shared/api";

import type {
  RecordingFilterType,
  SpeechRecordingWithRelations,
} from "../model/recording.type";

export async function getRecording(
  filter?: RecordingFilterType
): Promise<Paged<SpeechRecordingWithRelations>> {
  const { page, pageSize, from, to } = calculatePagination(
    filter?.page,
    filter?.pageSize
  );

  const queryBuilder = supabase
    .from("speech_recordings")
    .select("*, sentences(*), ai_feedbacks(*)", { count: "exact" })
    .order("created_at", { ascending: false });

  const response = await queryBuilder.range(from, to);
  const items = unwrap<SpeechRecordingWithRelations[]>(response);
  const total = response.count ?? 0;

  return createPagedResult({
    items,
    total,
    page,
    pageSize,
  });
}
