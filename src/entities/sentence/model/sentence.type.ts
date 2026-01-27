import type { Database } from '@shared/api/generated/database';

export type SentenceRow = Database['public']['Tables']['sentences']['Row'];
export type SentenceInsert =
  Database['public']['Tables']['sentences']['Insert'];

/**0 전체 |1 question |2 answer */
export type SentenceKindType = 0 | 1 | 2;

export type SentenceType = {
  id: string;
  created_at: string;
  sentence_eng: string;
  sentence_kor: string;
  type: number;
  level: string;
  theme_id: number;
};

export type SentenceFilterType = {
  type?: SentenceKindType;
  id?: string;
  q?: string;
  page?: number;
  pageSize?: number;
};
