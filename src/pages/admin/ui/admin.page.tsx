import { overlay } from "overlay-kit";

import { useAuthContext } from "@entities/auth";

import { Card, TextButton } from "@shared/ui";

import { AddParagraphOverlay } from "./overlay/AddParagraphOverlay";

export const AdminPage = () => {
  const { auth } = useAuthContext();
  const handleAddParagraph = () => {
    const userId = auth.user?.id;
    if (!userId) return;
    overlay.open(({ close, unmount }) => (
      <AddParagraphOverlay
        userId={userId}
        onClose={() => {
          close();
          unmount();
        }}
      />
    ));
  };
  return (
    <div className="flex flex-col items-center gap-6 p-6 overflow-hidden">
      <Card className="w-full">
        <ul>
          <li>
            <TextButton onClick={handleAddParagraph}>문단 추가하기</TextButton>
          </li>
        </ul>
      </Card>
    </div>
  );
};
