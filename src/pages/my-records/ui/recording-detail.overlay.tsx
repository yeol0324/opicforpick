import { FeedbackPanel } from '@features/ai-feedback';

import type { FeedbackContentType } from '@entities/feedback';
import type { SpeechRecordingWithRelations } from '@entities/recording';

import { Card, CloseButton, EmptyState } from '@shared/ui';

type RecordingDetailOverlayProps = {
  params: SpeechRecordingWithRelations;
  onClose: () => void;
};
export const RecordingDetailOverlay = ({
  params,
  onClose,
}: RecordingDetailOverlayProps) => {
  const feedback = params.ai_feedbacks?.[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="max-h-[80dvh] w-full max-w-sm rounded-2xl bg-white p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">피드백 상세</h2>
          <CloseButton onClick={onClose} />
        </div>

        {feedback ? (
          <Card mode="scroll" maxHeight="70dvh">
            <FeedbackPanel
              feedback={feedback.feedback as FeedbackContentType}
            />
          </Card>
        ) : (
          <EmptyState message="피드백이 없습니다." />
        )}
      </div>
    </div>
  );
};
