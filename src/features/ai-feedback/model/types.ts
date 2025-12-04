import type { FeedbackContent } from "@entities/feedback";
import type { Sentence } from "@entities/sentence";
import type { ProficiencyLevel } from "@shared/lib";

export interface UseFeedbackParam {
  question: Sentence;
  // userId: string;
  level?: ProficiencyLevel;
  audioBlob: Blob;
}
export type FeedbackResponse = { result: FeedbackContent };
export interface FeedbackRequest {
  transcript: string;
  question: string;
  level?: ProficiencyLevel;
}
