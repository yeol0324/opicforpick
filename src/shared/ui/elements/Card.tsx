import { useState, type ReactNode } from "react";
type CardMode = "default" | "scroll" | "expand";

interface CardProps {
  children: ReactNode;
  className?: string;

  mode?: CardMode;

  // scroll / expand 공통
  minHeight?: string; // ex: "200px", "30vh"

  // scroll
  maxHeight?: string; // ex: "60vh"

  // expand
  expandLabel?: string;
  collapseLabel?: string;
}
export function Card({
  children,
  className = "",
  mode = "default",
  minHeight,
  maxHeight,
  expandLabel = "더보기",
  collapseLabel = "접기",
}: CardProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  // 기본 클래스
  const baseClass =
    "rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]";

  // mode별 스타일
  const modeStyle =
    mode === "scroll"
      ? {
          minHeight,
          maxHeight,
          overflowY: "auto" as const,
        }
      : mode === "expand"
      ? {
          minHeight,
          maxHeight: expanded ? "none" : maxHeight ?? minHeight,
          overflow: "hidden" as const,
        }
      : undefined;

  return (
    <section className={`${baseClass} ${className}`} style={modeStyle}>
      {children}

      {mode === "expand" && (
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
}
