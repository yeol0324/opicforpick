import { useMemo } from "react";
import type { Paragraph } from "@entities/paragraph";
import { THEME } from "@shared/lib";

type ParagraphListItemProps = {
  paragraph: Paragraph;
  isSelected: boolean;
  onClick: () => void;
};

export function ParagraphListItem({
  paragraph,
  isSelected,
  onClick,
}: ParagraphListItemProps) {
  const backgroundColor = useMemo(() => {
    if (isSelected) {
      return "rgba(50, 182, 191, 0.1)";
    }
    return "transparent";
  }, [isSelected]);

  return (
    <li
      className="pb-3 cursor-pointer hover:bg-slate-100 p-2 rounded transition-colors"
      onClick={onClick}
      style={{
        backgroundColor,
        fontWeight: isSelected ? "bold" : "normal",
      }}
    >
      {paragraph.title}
    </li>
  );
}
