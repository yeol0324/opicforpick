import { FeedbackPanel } from "@features/ai-feedback/ui/FeedbackPanel";
import { useDailyQuestion } from "@features/daily-question/model/useDailyQuestion";
import { DailyQuestionSection } from "@features/daily-question/ui/DailyQuestionSection";
import { BlobPlayer } from "@features/playback/ui/BlobPlayer";
import { useRecordFlow } from "@features/record-start-stop";
import { formatMmSs } from "@shared/lib";
import { CircleProgressButton } from "@shared/ui/recorder/CircleProgressButton";

export function HomePage() {
  const { state, start, stop, save, retry, audioInfo, elapsedMs, progress } =
    useRecordFlow();

  const isRecording = state === "recording";
  const isSaving = state === "saving";
  const displayTime = formatMmSs(isRecording ? elapsedMs : 0);
  const handleRecordClick = isRecording ? stop : start;
  const recordButtonLabel = isRecording ? "녹음 중지" : "녹음 시작";
  const recordIcon = isRecording ? "⏺" : "▶";

  const { data: sentence, isLoading, error } = useDailyQuestion("Advanced");

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <DailyQuestionSection
        sentence={sentence}
        loading={isLoading}
        error={error}
      />
      <div className="grid place-items-center gap-4 py-6">
        <CircleProgressButton
          progress={progress}
          onClick={handleRecordClick}
          disabled={isSaving}
          ariaLabel={recordButtonLabel}
        >
          <div className="text-4xl">{recordIcon}</div>
        </CircleProgressButton>

        <div className="text-3xl tabular-nums tracking-wider text-black">
          {displayTime}
        </div>
      </div>
      {audioInfo && sentence && (
        <div className="flex flex-col items-center gap-4">
          <BlobPlayer blobInfo={audioInfo} />
          <div className="flex gap-2">
            <FeedbackPanel
              audioBlob={audioInfo.blob}
              question={sentence?.sentence_eng}
            />
            <button
              onClick={save}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving ? "저장 중..." : "저장"}
            </button>
            <button
              onClick={retry}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              다시하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
