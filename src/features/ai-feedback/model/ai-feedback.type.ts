
import type { FeedbackContentType } from "@entities/feedback";
<<<<<<< HEAD
import type { SentenceType } from "@entities/sentence";
=======
import type { Sentence } from "@entities/sentence";
>>>>>>> origin/main

import type { ProficiencyLevel } from "@shared/lib";

export interface UseFeedbackParam {
  question: SentenceType;
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
