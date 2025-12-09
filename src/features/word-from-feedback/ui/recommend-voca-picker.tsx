import { useState } from "react";

import type { FeedbackContentType } from "@entities/feedback";

import { BaseButton } from "@shared/ui";

type RecommendVocaPickerProps = {
  items: FeedbackContentType["recommendVoca"];
  onSave: (selected: FeedbackContentType["recommendVoca"]) => void;
  isSaving: boolean;
};

export const RecommendVocaPicker = ({
  items,
  onSave,
  isSaving,
}: RecommendVocaPickerProps) => {
  const [selectedSet, setSelectedSet] = useState<Set<string>>(() => new Set());

  const toggle = (expression: string) => {
    setSelectedSet((prev) => {
      const next = new Set(prev);
      if (next.has(expression)) {
        next.delete(expression);
      } else {
        next.add(expression);
      }
      return next;
    });
  };

  const selectedItems = items.filter((item) =>
    selectedSet.has(item.expression)
  );

  const handleSaveClick = () => {
    if (selectedItems.length === 0) return;
    onSave(selectedItems);
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-slate-900">
        추천 단어 (단어장에 추가)
      </div>

      <ul className="space-y-2">
        {items.map((item) => {
          const checked = selectedSet.has(item.expression);
          return (
            <li
              key={item.expression}
              className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(item.expression)}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">
                  {item.expression}
                </span>
                <span className="text-xs text-slate-600">{item.meaning}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <BaseButton
        onClick={handleSaveClick}
        disabled={isSaving || selectedItems.length === 0}
      >
        {isSaving ? "저장 중..." : "선택한 단어 단어장에 추가"}
      </BaseButton>
    </div>
  );
};
