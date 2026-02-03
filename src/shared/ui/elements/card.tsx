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

  // Only apply inline styles for expand mode to control max-height dynamically
  const modeStyle =
    mode === 'expand'
      ? {
          minHeight,
          maxHeight: expanded ? 'none' : (maxHeight ?? minHeight),
          overflow: 'hidden' as const,
        }
      : mode === 'scroll'
        ? {
            minHeight,
            maxHeight,
          }
        : undefined;

  // For scroll mode, apply overflow via className instead of inline style
  const scrollClass = mode === 'scroll' ? 'overflow-y-auto' : '';

  return (
    <section
      ref={ref}
      className={twMerge(
        'rounded-2xl bg-white p-6 shadow-sm',
        scrollClass,
        className,
      )}
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
