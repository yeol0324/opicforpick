import type { ButtonHTMLAttributes } from 'react';

type CloseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: number; // px (optional)
};

export const CloseButton = ({
  size = 28,
  className = '',
  ...rest
}: CloseButtonProps) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <button
      type="button"
      aria-label="닫기"
      {...rest}
      style={style}
      className={[
        'inline-flex items-center justify-center rounded-full',
        'bg-slate-200 text-slate-700',
        'hover:bg-slate-300 hover:text-slate-900',
        'active:bg-slate-400',
        'transition-colors',
        className,
      ].join(' ')}
    >
      {/* X 아이콘 */}
      <span className="block text-[12px] leading-none font-bold">×</span>
    </button>
  );
};
