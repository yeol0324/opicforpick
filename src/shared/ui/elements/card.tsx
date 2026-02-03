import { useState, type ReactNode, forwardRef } from 'react';

import { twMerge } from 'tailwind-merge';

type CardMode = 'default' | 'scroll' | 'expand';

export interface CardProps {
  children: ReactNode;
  className?: string;

  mode?: CardMode;

  // scroll / expand 공통
  minHeight?: string;

  // scroll
  maxHeight?: string;

  // expand
  expandLabel?: string;
  collapseLabel?: string;
}

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  {
    children,
    className,
    mode = 'default',
    minHeight,
    maxHeight,
    expandLabel = '더보기',
    collapseLabel = '접기',
  },
  ref,
) {
  const [expanded, setExpanded] = useState(false);

  const baseClass =
    'mx-auto rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]';

  const modeStyle =
    mode === 'scroll'
      ? {
          minHeight,
          maxHeight,
          overflowY: 'auto' as const,
        }
      : mode === 'expand'
        ? {
            minHeight,
            maxHeight: expanded ? 'none' : (maxHeight ?? minHeight),
            overflow: 'hidden' as const,
          }
        : undefined;

  return (
    <section
      ref={ref}
      className={twMerge(baseClass, className)}
      style={modeStyle}
    >
      {children}

      {mode === 'expand' && (
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? collapseLabel : expandLabel}
          </button>
        </div>
      )}
    </section>
  );
});
