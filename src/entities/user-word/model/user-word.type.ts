import type { WordType } from '@entities/word';

export type UserWordType = {
  id: number;
  user_id: string;
  word_id: number;
  created_at: string;
  word?: WordType;
};
