type WordBase = {
  expression: string;
  meaning: string;
};

export type WordCandidate = WordBase;

export type WordType = WordBase & {
  id: number;
  created_at: string;
};

export type WordFilter = {
  q?: string;
  page?: number;
  pageSize?: number;
};
