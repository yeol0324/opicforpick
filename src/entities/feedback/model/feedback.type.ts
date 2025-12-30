import type { WordCandidateType } from "@entities/word";

import type { Database } from "@shared/api/generated/database";

export type FeedbackType = Database["public"]["Tables"]["ai_feedbacks"]["Row"];

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
