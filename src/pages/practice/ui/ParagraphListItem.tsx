import type { Paragraph } from "@entities/paragraph";

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
  return (
    <li
      className={[
        "pb-3 cursor-pointer p-2 rounded transition-colors",
        "hover:bg-slate-100",
        isSelected ? "font-bold" : "font-normal",
      ].join(" ")}
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? "rgba(50, 182, 191, 0.1)" : "transparent",
      }}
    >
      {paragraph.title}
    </li>
  );
}
