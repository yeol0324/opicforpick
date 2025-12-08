import type { Sentence } from "@entities/sentence";
import type { WordCandidateType } from "@entities/word";

export type FeedbackType = {
  id: string;
  createdAt: string;
  userId: string;
  sentenceId: Sentence;
  feedback: FeedbackContentType;
  recordingId: string;
};
export type FeedbackContentType = {
  pronunciationComment: string;
  grammarComment: string;
  vocabularyComment: string;
  contentComment: string;
  overallComment: string;
  pronunciationScore?: number;
  grammarScore?: number;
  vocabularyScore?: number;
  contentScore?: number;
  rawTranscript?: string;
  recommendVoca: WordCandidateType[];
};
export type FeedbackFilter = {
  page?: number;
  pageSize?: number;
};
export type CreateFeedback = {
  created_at?: string;
  feedback: FeedbackContentType;
  id?: string;
  sentence_id: string;
  transcript: string;
  user_id: string;
};
export type UpdateFeedback = {
  created_at?: string;
  feedback?: JSON;
  id?: string;
  sentence_id?: string;
  transcript?: string;
  user_id?: string;
};
