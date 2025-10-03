import { type ReactNode, useMemo } from "react";

type Props = {
  /** 0 ~ 1 */
  progress: number;
  /** px */
  size?: number;
  /** px */
  stroke?: number;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  ariaLabel?: string;
};

export function CircleProgressButton({
  progress,
  size = 120,
  stroke = 8,
  onClick,
  disabled,
  children,
  ariaLabel,
}: Props) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = useMemo(() => {
    const p = Math.max(0, Math.min(1, progress || 0));
    return `${p * circumference} ${circumference}`;
  }, [progress, circumference]);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="relative inline-grid place-items-center rounded-full"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="opacity-20"
          stroke="#000000"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke="#000000"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeDasharray={dash}
        />
      </svg>

      <div className="relative grid place-items-center rounded-full w-[70%] h-[70%] bg-black text-white">
        {children}
      </div>
    </button>
  );
}
