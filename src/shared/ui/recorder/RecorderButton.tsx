import type { ReactNode } from "react";

import { CircleProgress } from "../elements/CircleProgress";

type RecordingCircleButtonProps = {
  progress: number;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
};

export function RecorderButton({
  progress,
  onClick,
  disabled,
  children,
}: RecordingCircleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="relative grid place-items-center w-[120px] h-[120px] rounded-full"
    >
      <CircleProgress progress={progress} />
      <div className="relative grid place-items-center w-[70%] h-[70%] rounded-full bg-black text-white">
        {children}
      </div>
    </button>
  );
}
