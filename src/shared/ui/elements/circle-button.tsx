import type { ButtonHTMLAttributes, ReactNode } from 'react';

type CircleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: number; // px (optional)
  children?: ReactNode;
};

export const CircleButton = ({
  size = 28,
  children = '',
  className = '',
  ...rest
}: CircleButtonProps) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <button
      type="button"
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
      <span className="block text-[12px] leading-none font-bold">
        {children}
      </span>
    </button>
  );
};
