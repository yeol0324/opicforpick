type WordBase = {
  expression: string;
  meaning: string;
};

export type WordCandidate = WordBase;

export type WordItem = WordBase & {
  id: number;
};
