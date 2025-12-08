import type { FeedbackContentType } from "@entities/feedback";
import type { Sentence } from "@entities/sentence";
import { FeedbackPanel } from "@features/ai-feedback";
import { BlobPlayer } from "@features/playback";
import { useRecordFlow, type AudioInfo } from "@features/record-start-stop";
import { formatMmSs } from "@shared/lib";
import { Button, Card, RecorderButton, Spinner } from "@shared/ui";

type RecordingFlowSectionProps = {
  sentence: Sentence | null | undefined;
  onComplete: (info: AudioInfo) => void;
  onReset: () => void;
  isFeedbackLoading: boolean;
  isFeedbackError: boolean;
  feedback: FeedbackContentType | null | undefined;
  onFeedbackClick: () => void;
};

export const RecordingFlowSection = ({
  sentence,
  onComplete,
  onReset,
  isFeedbackLoading,
  isFeedbackError,
  feedback,
  onFeedbackClick,
}: RecordingFlowSectionProps) => {
  const recordFlow = useRecordFlow({
    onComplete,
    onReset,
  });
  const isRecording = recordFlow.state === "recording";
  const isSaving = recordFlow.state === "saving";
  const recordIcon = isRecording ? "⏺" : "▶";
  const displayTime = formatMmSs(isRecording ? recordFlow.elapsedMs : 0);
  const handleRecordClick = isRecording ? recordFlow.stop : recordFlow.start;

  if (recordFlow.audioInfo && sentence) {
    return (
      <section className="flex flex-col items-center gap-4 w-full">
        <BlobPlayer blobInfo={recordFlow.audioInfo} />

        <div className="flex gap-2">
          {!feedback && (
            <Button
              onClick={onFeedbackClick}
              disabled={isSaving || isFeedbackLoading}
            >
              {isFeedbackLoading ? "피드백 요청 중..." : "AI 피드백 받기"}
            </Button>
          )}
          <Button onClick={onReset} disabled={isSaving || isFeedbackLoading}>
            다시하기
          </Button>
        </div>

        {isFeedbackLoading && <Spinner />}

        {isFeedbackError && (
          <div className="mt-2 text-sm text-red-600">
            피드백 요청 중 오류가 발생했습니다.
          </div>
        )}

        {feedback && (
          <Card>
            <FeedbackPanel feedback={feedback} />
          </Card>
        )}
      </section>
    );
  }

  // 녹음 전
  return (
    <div className="grid place-items-center gap-4 py-6">
      <RecorderButton
        progress={recordFlow.progress}
        onClick={handleRecordClick}
        disabled={isSaving}
      >
        <div className="text-4xl">{recordIcon}</div>
      </RecorderButton>

      <div className="text-3xl tabular-nums tracking-wider text-black">
        {displayTime}
      </div>
    </div>
  );
};
