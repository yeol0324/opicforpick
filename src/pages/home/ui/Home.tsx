import { FeedbackPanel } from "@features/ai-feedback/ui/FeedbackPanel";
import { useDailyQuestion } from "@features/daily-question/model/useDailyQuestion";
import { DailyQuestionSection } from "@features/daily-question/ui/DailyQuestionSection";
import { BlobPlayer } from "@features/playback/ui/BlobPlayer";
import { useRecordFlow } from "@features/record-start-stop";
import { useFeedback } from "@features/ai-feedback/model/useFeedback";
import { formatMmSs } from "@shared/lib";
import { RecorderButton, Spinner } from "@shared/ui";

export function Home() {
  const { state, start, stop, retry, audioInfo, elapsedMs, progress } =
    useRecordFlow();
  const isRecording = state === "recording";
  const isSaving = state === "saving";
  const displayTime = formatMmSs(isRecording ? elapsedMs : 0);
  const handleRecordClick = isRecording ? stop : start;
  const recordIcon = isRecording ? "⏺" : "▶";

  const { data: sentence, isLoading, error } = useDailyQuestion("Advanced");

  const {
    feedback,
    isLoading: isFeedbackLoading,
    isError,
    submitFeedback,
  } = useFeedback();

  const handleFeedbackClick = () => {
    if (!audioInfo || !sentence) return;
    submitFeedback({
      audioBlob: audioInfo.blob,
      question: sentence,
      level: "Intermediate",
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <DailyQuestionSection
        sentence={sentence}
        loading={isLoading}
        error={error}
      />

      {audioInfo && sentence ? (
        <div className="flex flex-col items-center gap-4 w-full">
          <BlobPlayer blobInfo={audioInfo} />

          <div className="flex gap-2">
            {!feedback ? (
              <button
                onClick={handleFeedbackClick}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving || isFeedbackLoading}
              >
                {isFeedbackLoading ? "피드백 요청 중..." : "AI 피드백 받기"}
              </button>
            ) : (
              <button
                onClick={retry}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving || isFeedbackLoading}
              >
                다시하기
              </button>
            )}
          </div>

          {isFeedbackLoading && (
            <div className="mt-2">
              <Spinner />
            </div>
          )}

          {isError && (
            <div className="mt-2 text-sm text-red-600">
              피드백 요청 중 오류가 발생했습니다.
            </div>
          )}

          {feedback && <FeedbackPanel feedback={feedback} />}
        </div>
      ) : (
        <div className="grid place-items-center gap-4 py-6">
          <RecorderButton
            progress={progress}
            onClick={handleRecordClick}
            disabled={isSaving}
          >
            <div className="text-4xl">{recordIcon}</div>
          </RecorderButton>

          <div className="text-3xl tabular-nums tracking-wider text-black">
            {displayTime}
          </div>
        </div>
      )}
    </div>
  );
}
