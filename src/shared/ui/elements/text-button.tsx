import type { ButtonHTMLAttributes } from 'react';

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function TextButton({
  className = '',
  children,
  ...props
}: TextButtonProps) {
  return (
    <button
      {...props}
      className={`w-full text-center text-xs text-slate-500 underline underline-offset-4 hover:text-slate-900 ${className}`}
    >
      {children}
    </button>
  );
}
