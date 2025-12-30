import { Card } from "@shared/ui";

type AddParagraphlOverlayProps = {
  onClose: () => void;
};
export const AddParagraphOverlay = ({ onClose }: AddParagraphlOverlayProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm  max-h-[80dvh] rounded-2xl bg-white p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Card>
          <h1>문단 추가</h1>
        </Card>
      </div>
    </div>
  );
};
