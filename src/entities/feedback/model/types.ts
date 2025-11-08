import type { ProficiencyLevel } from "@shared/lib";

export interface FeedbackRequest {
  transcript: string;
  question: string;
  level?: ProficiencyLevel;
}

export type FeedbackResponse = {
  transcript: string;
  result: {
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
};
