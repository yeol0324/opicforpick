import { useState } from "react";

import { FeedbackPanel } from "@features/ai-feedback";
import { useRecordFlow, type AudioInfo } from "@features/record-start-stop";
import {
  saveRecommendWords,
  RecommendVocaPicker,
} from "@features/word-from-feedback";

import { useAuthContext } from "@entities/auth";
import type { FeedbackContentType } from "@entities/feedback";
import type { SentenceRow } from "@entities/sentence";

import { BlobPlayer, formatMmSs } from "@shared/lib";
import { BaseButton, Card, RecorderButton, Spinner } from "@shared/ui";

type RecordingFlowSectionProps = {
  sentence: SentenceRow | null | undefined;
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

  const { auth } = useAuthContext();
  const user = auth.user;
  const [isWordSaving, setIsWordSaving] = useState(false);

  const handleSaveWords = async (
    selected: FeedbackContentType["recommendVoca"]
  ) => {
    if (!user) return;

    try {
      setIsWordSaving(true);
      await saveRecommendWords({
        userId: user.id,
        vocabulary: selected,
      });
      alert("저장완료");
    } finally {
      setIsWordSaving(false);
    }
  };

  if (recordFlow.audioInfo && sentence) {
    return (
      <section className="flex flex-col items-center gap-4 w-full">
        <BlobPlayer blob={recordFlow.audioInfo.blob} />

        <div className="flex gap-2">
          {!feedback && (
            <BaseButton
              onClick={onFeedbackClick}
              disabled={isSaving || isFeedbackLoading}
            >
              {isFeedbackLoading ? "피드백 요청 중..." : "AI 피드백 받기"}
            </BaseButton>
          )}
          <BaseButton
            onClick={onReset}
            disabled={isSaving || isFeedbackLoading}
          >
            다시하기
          </BaseButton>
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
        {feedback &&
          feedback.recommendVoca &&
          feedback.recommendVoca.length > 0 && (
            <RecommendVocaPicker
              items={feedback.recommendVoca}
              onSave={handleSaveWords}
              isSaving={isWordSaving}
            />
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
