import type { FeedbackType } from "@entities/feedback/model/feedback.type";
import type { SentenceType } from "@entities/sentence/model/sentence.type";

export type RecordingType = {
  id: string;
  userId: string;
  createdAt: string;
  sentenceId: string;
  audioUrl: string;
  sentences: SentenceType;
  ai_feedbacks: FeedbackType[];
};
export type RecordingFilterType = {
  page?: number;
  pageSize?: number;
};

