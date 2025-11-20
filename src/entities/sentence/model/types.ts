/**0 전체 |1 question |2 answer */
export type SentenceType = 0 | 1 | 2;

export type Sentence = {
  id: string;
  created_at: string;
  sentence_eng: string;
  sentence_kor: string;
  type: number;
  level: string;
  theme_id: number;
};

export type SentenceFilter = {
  type?: SentenceType;
  id?: string;
  q?: string;
  page?: number;
  pageSize?: number;
};
