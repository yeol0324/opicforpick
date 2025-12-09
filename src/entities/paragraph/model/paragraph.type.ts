import type { SentenceType } from "@entities/sentence/model/sentence.type";

export type ParagraphType = {
  id: string;
  created_at: string;
  title: string;
  note: string;
  theme_id: number;
};

export type ParagraphFilterType = {
  q?: string;
  page?: number;
  pageSize?: number;
};

export type ParagraphSentenceType = {
  created_at: string;
  id: number;
  override_kor: string;
  paragraph_id: string;
  position: number;
  sentence_id: string;
};

export type ParagraphSentenceFilterType = {
  q?: string;
  paragraphId?: string;
  page?: number;
  pageSize?: number;
};

export type ParagraphWithSentenceType = {
  paragraph: ParagraphType;
  sentenceList: SentenceType[];
};
