import { useState } from 'react';

import { useFeedback } from '@features/ai-feedback';
import {
  useDailyQuestion,
  DailyQuestionSection,
} from '@features/daily-question';
import { type AudioInfo } from '@features/record-start-stop';

import { useLatestFeedback } from '@entities/feedback';

import { Spinner } from '@shared/ui';

import { ExistingFeedbackSection } from './existing-feedback-section';
import { RecordingFlowSection } from './recording-flow-section';

export function Home() {
  const [audioInfo, setAudioInfo] = useState<AudioInfo | null>(null);
  const [ignoreLatest, setIgnoreLatest] = useState(false);

  const onRecordComplete = (info: AudioInfo) => {
    setAudioInfo(info);
  };

  const onRecordReset = () => {
    setIgnoreLatest(true);
    setAudioInfo(null);
    resetFeedback();
  };

  const {
    data: sentence,
    isLoading: isQuestionLoading,
    error: questionError,
  } = useDailyQuestion('Advanced');

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

  const handleFeedbackClick = () => {
    if (!audioInfo || !sentence) return;
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    submitFeedback({
      audioBlob: audioInfo.blob,
      question: sentence,
      level: 'Intermediate',
    });
  };

  const hasExistingFeedback = !!latestFeedback && !ignoreLatest;
  const isFeedbackDecisionPending =
    sentence && !ignoreLatest && isLatestLoading;
  const isBusy = isFeedbackLoading;

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <DailyQuestionSection
        sentence={sentence}
        loading={isQuestionLoading}
        error={questionError}
      />
      {isQuestionLoading || isFeedbackDecisionPending ? (
        <Spinner />
      ) : hasExistingFeedback && sentence && latestFeedback ? (
        <ExistingFeedbackSection
          isLatestLoading={isLatestLoading}
          isLatestError={isLatestError}
          latestFeedback={latestFeedback}
          isBusy={isBusy}
          onRetry={onRecordReset}
        />
      ) : (
        <RecordingFlowSection
          sentence={sentence}
          onComplete={onRecordComplete}
          onReset={onRecordReset}
          isFeedbackLoading={isFeedbackLoading}
          isFeedbackError={isFeedbackError}
          feedback={feedback?.result}
          onFeedbackClick={handleFeedbackClick}
        />
      )}
    </div>
  );
}
