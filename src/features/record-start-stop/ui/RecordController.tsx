import { CircleProgressButton } from "@shared/ui";
import { useRecordFlow } from "../model/useRecordFlow";
import { formatMmSs } from "@shared/lib";

export const RecordController = ({
  sentenceId,
  maxMs = 120000,
}: //TODO: IL: 30~40초, IM1/IM2: 50~60초, IM3/IH: 70~100초, AL: 80~100초
{
  sentenceId?: string;
  maxMs?: number;
}) => {
  const { state, start, stop, elapsedMs, progress } = useRecordFlow(
    sentenceId,
    { maxMs }
  );

  const isRecording = state === "recording";
  const disabled = state === "saving";

  return (
    <div className="grid place-items-center gap-4 py-6 text-red-500">
      <CircleProgressButton
        progress={progress}
        onClick={isRecording ? stop : start}
        disabled={disabled}
        ariaLabel={isRecording ? "Stop recording" : "Start recording"}
      >
        <div className="text-4xl">{isRecording ? "⏺" : "▶"}</div>
      </CircleProgressButton>

      <div className="text-3xl tabular-nums tracking-wider text-black">
        {formatMmSs(isRecording ? elapsedMs : 0)}
      </div>
    </div>
  );
};
