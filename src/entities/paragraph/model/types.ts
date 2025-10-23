export type Paragraph = {
  id: string;
  created_at: string;
  title: string;
  note: string;
  theme_id: number;
};

export type ParagraphFilter = {
  q?: string;
  page?: number;
  pageSize?: number;
};
