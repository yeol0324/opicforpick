import type { FeedbackContentType } from "@entities/feedback";
import type { SentenceRow } from "@entities/sentence";

import type { ProficiencyLevel } from "@shared/lib";

export interface UseFeedbackParam {
  question: SentenceRow;
  // userId: string;
  level?: ProficiencyLevel;
  audioBlob: Blob;
}
export type FeedbackResponse = { result: FeedbackContentType };
export interface FeedbackRequest {
  transcript: string;
  question: string;
  level?: ProficiencyLevel;
}
