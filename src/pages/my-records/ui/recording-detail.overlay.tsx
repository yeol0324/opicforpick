import type { Recording } from "@entities/recording";
import { FeedbackPanel } from "@features/ai-feedback";
import { Card, CloseButton } from "@shared/ui";

type RecordingDetailOverlayProps = {
  params: Recording;
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
        className="w-full max-w-sm  max-h-[80dvh] rounded-2xl bg-white p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">피드백 상세</h2>
          <CloseButton onClick={onClose} />
        </div>

        {feedback ? (
          <Card mode="scroll" maxHeight="70dvh">
            <FeedbackPanel feedback={feedback.feedback} />
          </Card>
        ) : (
          <p className="text-sm text-slate-500">피드백이 없습니다.</p>
        )}
      </div>
    </div>
  );
};
