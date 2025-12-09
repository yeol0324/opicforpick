import { useMemo } from "react";

type CircleProgressProps = {
  progress: number; // 0 ~ 1
  size?: number;
  stroke?: number;
  trackColor?: string;
  progressColor?: string;
};

export function CircleProgress({
  progress,
  size = 120,
  stroke = 8,
  trackColor = "#000000",
  progressColor = "#000000",
}: CircleProgressProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const dash = useMemo(() => {
    const p = Math.max(0, Math.min(1, progress || 0));
    return `${p * circumference} ${circumference}`;
  }, [progress, circumference]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        stroke={trackColor}
        opacity={0.2}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        stroke={progressColor}
        strokeLinecap="round"
        fill="none"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={dash}
      />
    </svg>
  );
}
