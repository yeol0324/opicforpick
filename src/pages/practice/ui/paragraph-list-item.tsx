import type { ParagraphRow } from '@entities/paragraph';

type ParagraphListItemProps = {
  paragraph: ParagraphRow;
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
        'cursor-pointer rounded p-2 pb-3 transition-colors',
        isSelected
          ? 'bg-[rgba(50,182,191,0.1)] font-bold hover:bg-[rgba(50,182,191,0.15)]'
          : 'font-normal hover:bg-slate-100',
      ].join(' ')}
      onClick={onClick}
    >
      {paragraph.title}
    </li>
  );
}
