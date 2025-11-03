import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ${className}`}
    >
      {children}
    </section>
  );
}
