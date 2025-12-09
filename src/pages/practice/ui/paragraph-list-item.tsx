import type { ParagraphType } from "@entities/paragraph";

type ParagraphListItemProps = {
  paragraph: ParagraphType;
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
        isSelected
          ? "bg-[rgba(50,182,191,0.1)] hover:bg-[rgba(50,182,191,0.15)] font-bold"
          : "hover:bg-slate-100 font-normal",
      ].join(" ")}
      onClick={onClick}
    >
      {paragraph.title}
    </li>
  );
}
