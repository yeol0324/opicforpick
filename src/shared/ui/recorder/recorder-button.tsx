import type { ReactNode } from 'react';

import { CircleProgress } from '../elements/circle-progress';

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
      className="relative grid h-[120px] w-[120px] place-items-center rounded-full"
    >
      <CircleProgress progress={progress} />
      <div className="relative grid h-[70%] w-[70%] place-items-center rounded-full bg-black text-white">
        {children}
      </div>
    </button>
  );
}
