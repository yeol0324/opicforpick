import { supabase } from '@shared/api';

export async function uploadRecording(opts: {
  userId: string;
  sentenceId?: string | null;
  blob: Blob;
}): Promise<string> {
  const { userId, sentenceId, blob } = opts;

  const mime = blob.type || 'audio/webm';
  const ext =
    mime === 'audio/webm'
      ? 'webm'
      : mime === 'audio/mp4' || mime === 'audio/m4a'
        ? 'm4a'
        : 'dat';

  const fileName = `${userId}/${
    sentenceId ?? 'no-sentence'
  }/${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from('recording')
    .upload(fileName, blob, {
      contentType: mime,
      upsert: false,
    });

  if (error) throw error;

  return data.path;
}
