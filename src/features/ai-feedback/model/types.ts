import type { ProficiencyLevel } from "@shared/lib";

export interface UseFeedbackParam {
  question: string;
  level?: ProficiencyLevel;
  audioBlob: Blob;
  recordingPath: string;
}
