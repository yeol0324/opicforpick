import { supabase } from '@shared/api';

import type { RecordingType } from '../model/recording.type';

export type CreateRecordingParam = {
  userId: string;
  sentenceId?: string | null;
  audioUrl: string;
  durationMs: number;
};

export async function createRecording(
  params: CreateRecordingParam,
): Promise<RecordingType> {
  const { data, error } = await supabase
    .from('speech_recordings')
    .insert({
      user_id: params.userId,
      sentence_id: params.sentenceId,
      audio_url: params.audioUrl,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
