export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface FeedbackRequest {
  transcript: string;
  question: string;
  level?: ProficiencyLevel;
}

export type FeedbackResponse = {
  transcript: string;
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
};

export interface UseFeedbackParam {
  question: string;
  level?: ProficiencyLevel;
  audioBlob: Blob;
  recordingPath: string;
}
