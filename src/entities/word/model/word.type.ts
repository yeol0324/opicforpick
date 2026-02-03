type WordBaseType = {
  expression: string;
  meaning: string;
};

export type WordCandidateType = WordBaseType;

export type WordType = WordBaseType & {
  id: number;
  created_at: string;
};

export type WordFilterType = {
  q?: string;
  page?: number;
  pageSize?: number;
};
