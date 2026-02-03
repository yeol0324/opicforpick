import type { ParagraphWithSentenceType } from '@entities/paragraph';

import { Card, CloseButton, EmptyState } from '@shared/ui';

type PracticeOverlayProps = {
  practiceInfo: ParagraphWithSentenceType;
  onClose: () => void;
};

export const PracticeOverlay = ({
  practiceInfo,
  onClose,
}: PracticeOverlayProps) => {
  if (!practiceInfo) {
    return <EmptyState />;
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="h-[80dvh] w-full max-w-sm rounded-2xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-3 flex justify-between">
          <h2>{practiceInfo.paragraph.title}</h2>
          <CloseButton onClick={onClose} />
        </header>
        <Card
          className="space-y-2"
          mode="scroll"
          minHeight="70dvh"
          maxHeight="70dvh"
        >
          {practiceInfo.sentenceList.map((sentence) => (
            <div key={sentence.id}>
              <div className="text-lg font-semibold">
                {sentence.sentence_eng}
              </div>
              <div className="text-sm text-slate-600">
                {sentence.sentence_kor}
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};
