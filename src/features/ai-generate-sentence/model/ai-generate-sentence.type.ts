import type { ProficiencyLevel } from "@shared/lib";

export type GenerateSentenceRequest = {
  topic: string;
  level?: ProficiencyLevel;
};

export type GenerateSentenceResponse = {
  result: {
    topic: string;
    sentences: {
      position: number;
      type: number;
      eng: string;
      kor: string;
    }[];
  };
};
