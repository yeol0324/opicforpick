import type { Recording } from "../model/types";

export type CreateRecordingInput = {
  sentenceId?: string | null;
  blob: Blob;
  durationMs: number;
};

export async function createRecording(
  input: CreateRecordingInput
): Promise<Recording> {
  console.log(input);

  // TODO: 1) upload to storage 2) save meta via server/Supabase 3) return row
  // return await post('/recordings', formData)
  throw new Error("not implemented");
}
