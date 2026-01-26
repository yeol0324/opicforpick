import type { SentenceRow } from '@entities/sentence';

import type { Database } from '@shared/api/generated/database';

export type ParagraphRow = Database['public']['Tables']['paragraphs']['Row'];
export type ParagraphSentencesRow =
  Database['public']['Tables']['paragraph_sentences']['Row'];

export type ParagraphInsert =
  Database['public']['Tables']['paragraphs']['Insert'];

export type ParagraphFilterType = {
  q?: string;
  page?: number;
  pageSize?: number;
};

export type ParagraphSentenceFilterType = {
  q?: string;
  paragraphId?: string;
  page?: number;
  pageSize?: number;
};

export type ParagraphWithSentenceType = {
  paragraph: ParagraphRow;
  sentenceList: SentenceRow[];
};
