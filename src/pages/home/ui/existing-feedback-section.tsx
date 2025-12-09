import { FeedbackPanel } from "@features/ai-feedback";

import type { FeedbackType } from "@entities/feedback";

import { Button, Card, Spinner } from "@shared/ui";



type ExistingFeedbackSectionProps = {
  isLatestLoading: boolean;
  isLatestError: boolean;
  latestFeedback: FeedbackType;
  isBusy: boolean;
  onRetry: () => void;
};

export const ExistingFeedbackSection = ({
  isLatestLoading,
  isLatestError,
  latestFeedback,
  isBusy,
  onRetry,
}: ExistingFeedbackSectionProps) => {
  return (
    <section className="flex flex-col items-center gap-4 w-full">
      <div className="flex gap-2">
        <Button onClick={onRetry} disabled={isBusy}>
          다시하기
        </Button>
      </div>

      {isLatestLoading && (
        <div className="mt-2">
          <Spinner />
        </div>
      )}

      {isLatestError && (
        <div className="mt-2 text-sm text-red-600">
          이전 피드백을 불러오는 중 오류가 발생했습니다.
        </div>
      )}

      {!isLatestLoading && latestFeedback && (
        <Card>
          <FeedbackPanel feedback={latestFeedback.feedback} />
        </Card>
      )}
    </section>
  );
};

