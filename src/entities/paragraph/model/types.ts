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

export type Paged<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};
