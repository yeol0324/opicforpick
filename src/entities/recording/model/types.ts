import type { Feedback } from "@entities/feedback";
import type { Sentence } from "@entities/sentence";

export type Recording = {
  id: string;
  userId: string;
  createdAt: string;
  sentenceId: string;
  audioUrl: string;
  sentences: Sentence;
  ai_feedback: Feedback[];
};
export type RecordingFilter = {
  page?: number;
  pageSize?: number;
};
