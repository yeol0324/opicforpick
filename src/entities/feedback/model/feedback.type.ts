import type { SentenceType } from "@entities/sentence/model/sentence.type";
import type { WordCandidateType } from "@entities/word";

export type FeedbackType = {
  id: string;
  createdAt: string;
  userId: string;
  sentenceId: SentenceType;
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
export type FeedbackFilterType = {
  page?: number;
  pageSize?: number;
};
export type CreateFeedbackType = {
  created_at?: string;
  feedback: FeedbackContentType;
  id?: string;
  sentence_id: string;
  transcript: string;
  user_id: string;
};
export type UpdateFeedbackType = {
  created_at?: string;
  feedback?: JSON;
  id?: string;
  sentence_id?: string;
  transcript?: string;
  user_id?: string;
};
