import type { ReactNode } from 'react';

interface DividerProps {
  /** Optional label to display in the center of the divider */
  label?: string | ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Divider component for visual section separation
 */
export function Divider({ label, className = '' }: DividerProps) {
  if (label) {
    return (
      <div className={`relative flex items-center ${className}`}>
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="mx-4 flex-shrink text-xs font-medium tracking-wide text-slate-500 uppercase">
          {label}
        </span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>
    );
  }

  return <div className={`border-t border-slate-200 ${className}`} />;
}
