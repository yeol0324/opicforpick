import { useState } from "react";
import { useLatestFeedback } from "@entities/feedback";
import { useFeedback } from "@features/ai-feedback";
import {
  useDailyQuestion,
  DailyQuestionSection,
} from "@features/daily-question";
import { useRecordFlow } from "@features/record-start-stop";
import { formatMmSs } from "@shared/lib";
import { Spinner } from "@shared/ui";
import { RecordingFlowSection } from "./RecordingFlowSection";
import { ExistingFeedbackSection } from "./ExistingFeedbackSection";

export function Home() {
  const recordFlow = useRecordFlow();

  const retryRecording = () => {
    setIgnoreLatest(true);
    resetFeedback();
    recordFlow.retry();
  };

  const {
    data: sentence,
    isLoading: isQuestionLoading,
    error: questionError,
  } = useDailyQuestion("Advanced");

  const {
    data: latestFeedback,
    isLoading: isLatestLoading,
    isError: isLatestError,
  } = useLatestFeedback(sentence?.id);

  const {
    feedback,
    isLoading: isFeedbackLoading,
    isError: isFeedbackError,
    submitFeedback,
    reset: resetFeedback,
  } = useFeedback();

  const [ignoreLatest, setIgnoreLatest] = useState(false);

  const handleFeedbackClick = () => {
    if (!recordFlow.audioInfo || !sentence) return;
    submitFeedback({
      audioBlob: recordFlow.audioInfo.blob,
      question: sentence,
      level: "Intermediate",
    });
  };

  const hasExistingFeedback = !!latestFeedback && !ignoreLatest;
  const isBusy = isFeedbackLoading; //||recordFlow.state === 'isSaving'

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <DailyQuestionSection
        sentence={sentence}
        loading={isQuestionLoading}
        error={questionError}
      />
      {isQuestionLoading ? (
        <Spinner />
      ) : hasExistingFeedback && sentence && latestFeedback ? (
        <ExistingFeedbackSection
          isLatestLoading={isLatestLoading}
          isLatestError={isLatestError}
          latestFeedback={latestFeedback}
          isBusy={isBusy}
          onRetry={retryRecording}
        />
      ) : (
        <RecordingFlowSection
          sentence={sentence}
          recordFlow={recordFlow}
          isFeedbackLoading={isFeedbackLoading}
          isFeedbackError={isFeedbackError}
          feedback={feedback?.result}
          onFeedbackClick={handleFeedbackClick}
          onRetry={retryRecording}
        />
      )}
    </div>
  );
}
