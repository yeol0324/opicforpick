import { Card, CloseButton } from "@shared/ui";
import type { WordType } from "@entities/word";

type WordDetailOverlayProps = {
  word: WordType;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
};

export const WordDetailOverlay = ({
  word,
  index,
  total,
  onPrev,
  onNext,
  onClose,
}: WordDetailOverlayProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-3 flex justify-between">
          <h2>
            단어 상세 ({index + 1} / {total})
          </h2>
          <CloseButton onClick={onClose} />
        </header>

        <Card className="space-y-2">
          <div className="text-lg font-semibold">{word.expression}</div>
          <div className="text-sm text-slate-600">{word.meaning}</div>
        </Card>

        <div className="mt-4 flex justify-between">
          <button onClick={onPrev}>←</button>
          <button onClick={onNext}>→</button>
        </div>
      </div>
    </div>
  );
};
