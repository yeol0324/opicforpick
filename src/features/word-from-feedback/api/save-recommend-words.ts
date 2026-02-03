import type { FeedbackContentType } from '@entities/feedback';
import { createUserWords } from '@entities/user-word/api/create-user-words';
import { createWords } from '@entities/word/api/create-words';
import type { WordCandidateType } from '@entities/word/model/word.type';

export type SaveRecommendWordsParams = {
  userId: string;
  vocabulary: FeedbackContentType['recommendVoca'];
};

export async function saveRecommendWords({
  userId,
  vocabulary,
}: SaveRecommendWordsParams): Promise<void> {
  if (vocabulary.length === 0) {
    return;
  }

  const candidates: WordCandidateType[] = vocabulary.map((item) => ({
    expression: item.expression,
    meaning: item.meaning,
  }));

  const words = await createWords(candidates);

  const wordIds = words.map((word) => word.id);
  await createUserWords(userId, wordIds);
}
