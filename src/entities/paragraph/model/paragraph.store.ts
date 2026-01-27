import { create } from 'zustand';

import type { SentenceInsert } from '@entities/sentence';

import type { ParagraphInsert } from './paragraph.type';

type State = {
  paragraph: ParagraphInsert | null;
  sentences: SentenceInsert[];
};

type Actions = {
  setParagraph: (paragraph: ParagraphInsert) => void;
  setSentences: (sentences: SentenceInsert[]) => void;
  addSentence: (sentence: SentenceInsert) => void;
};

export const useParagraphStore = create<State & Actions>((set) => ({
  paragraph: null,
  sentences: [],
  setParagraph: (paragraph) => set({ paragraph }),
  setSentences: (sentences) => set({ sentences }),
  addSentence: (newSentence) =>
    set((state) => ({ sentences: [...state.sentences, newSentence] })),
}));
