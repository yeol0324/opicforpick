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

