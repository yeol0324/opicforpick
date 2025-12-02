import type { Sentence } from "@entities/sentence";

export type ParagraphSentence = {
  created_at: string;
  id: number;
  override_kor: string;
  paragraph_id: string;
  position: number;
  sentence_id: string;
};

export type ParagraphSentenceFilter = {
  q?: string;
  paragraphId?: string;
  page?: number;
  pageSize?: number;
};

export type ParagraphSentenceWithSentence = ParagraphSentence & {
  sentences: Sentence | null;
};
