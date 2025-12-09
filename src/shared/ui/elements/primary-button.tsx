import type { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({
  className = "",
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`flex w-full items-center justify-center rounded-xl bg-teal-500 px-4 py-2.5 text-sm font-semibold
        text-white shadow-sm transition
        hover:bg-teal-500/90
        disabled:cursor-not-allowed disabled:bg-slate-300 ${className}`}
    >
      {children}
    </button>
  );
}
