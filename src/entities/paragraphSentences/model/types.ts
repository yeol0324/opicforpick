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

export type Paged<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};
