export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface FeedbackResponse {
  // scores: FeedbackScore;
  // summary: string; // 전체 총평
  // improvedSentence?: string; // 수정된 완성 문장
  // items: FeedbackItem[]; // 세부 피드백 리스트
  rawTranscript?: string; // 최종 사용된 transcript
}

export interface UseFeedbackParam {
  referenceSentence?: string;
  level?: ProficiencyLevel;
  audioBlob: Blob;
  recordingPath: string;
}
