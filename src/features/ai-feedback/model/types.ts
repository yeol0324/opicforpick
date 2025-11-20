import type { Sentence } from "@entities/sentence";
import type { ProficiencyLevel } from "@shared/lib";

export interface UseFeedbackParam {
  question: Sentence;
  // userId: string;
  level?: ProficiencyLevel;
  audioBlob: Blob;

  // recordingPath: string;
}
