import { BlobPlayer } from "@features/playback/ui/BlobPlayer";
import { RandomSentenceBox } from "@features/random-sentence/ui/RandomSentenceBox";
import { RecordController, useRecordFlow } from "@features/record-start-stop";
import { formatMmSs } from "@shared/lib/time/formatDuration";
import { CircleProgressButton } from "@shared/ui/CircleProgressButton";

export function HomePage() {
  const { state, start, stop, save, retry, audioInfo, elapsedMs, progress } =
    useRecordFlow();
  const isRecording = state === "recording";
  const disabled = state === "saving";

  //TODO: theme 추가
  return (
    <>
      <RandomSentenceBox type={1} />
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
      {audioInfo && (
        <>
          <BlobPlayer blobInfo={audioInfo} />
          <button onClick={() => save}>저장</button>
          <button onClick={() => retry}>다시하기</button>
        </>
      )}
    </>
  );
}
