export type Sentence = {
  id: string;
  created_at: string;
  sentence_eng: string;
  sentence_kor: string;
  type: number;
  level: string;
  theme_id: number;
};

export type SentenceType = 0 | 1 | 2;

export type SentenceFilter = {
  type?: SentenceType;
  id?: string;
  q?: string;
  page?: number;
  pageSize?: number;
};

export type Paged<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};
