import type { Sentence } from "@entities/sentence";
import type { WordCandidate } from "@entities/word";

export type Feedback = {
  id: string;
  createdAt: string;
  userId: string;
  sentenceId: Sentence;
  feedback: FeedbackContent;
  recordingId: string;
};
export type FeedbackContent = {
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
  recommendedVocabulary: WordCandidate[];
};
export type FeedbackFilter = {
  page?: number;
  pageSize?: number;
};
export type CreateFeedback = {
  created_at?: string;
  feedback: FeedbackContent;
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
