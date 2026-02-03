import type { FeedbackType } from '@entities/feedback/model/feedback.type';
import type { SentenceRow } from '@entities/sentence/model/sentence.type';

import type { Database } from '@shared/api/generated/database';

export type RecordingRow =
  Database['public']['Tables']['speech_recordings']['Row'];

type SpeechRecordingRow =
  Database['public']['Tables']['speech_recordings']['Row'];

type AiFeedbackRow = Database['public']['Tables']['ai_feedbacks']['Row'];

export type SpeechRecordingWithRelations = SpeechRecordingRow & {
  sentences: SentenceRow | null; // 1:1 이면
  ai_feedbacks: AiFeedbackRow[] | null; // 1:N 이면
};
export type RecordingType = {
  id: string;
  userId: string;
  createdAt: string;
  sentenceId: string;
  audioUrl: string;
  sentences: SentenceRow;
  ai_feedbacks: FeedbackType[];
};
export type RecordingFilterType = {
  page?: number;
  pageSize?: number;
};
