import type { ProficiencyLevel } from '@shared/lib';

export type GenerateSentenceRequest = {
  topic: string;
  subTopic: string;
  level?: ProficiencyLevel;
};

export type GenerateSentenceResponse = {
  result: {
    topic: string;
    subTopic: string;
    title: string;
    sentences: {
      position: number;
      type: number;
      eng: string;
      kor: string;
    }[];
  };
};
