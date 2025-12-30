import { overlay } from "overlay-kit";

import { Card, TextButton } from "@shared/ui";

import { AddParagraphOverlay } from "./overlay/AddParagraphOverlay";

export const AdminPage = () => {
  const handleAddParagraph = () => {
    overlay.open(({ close, unmount }) => (
      <AddParagraphOverlay
        onClose={() => {
          close();
          unmount();
        }}
      />
    ));
  };
  return (
    <div className="flex flex-col items-center gap-6 p-6 overflow-hidden">
      <Card>
        <ul>
          <li>
            <TextButton onClick={handleAddParagraph}>문단 추가하기</TextButton>
          </li>
        </ul>
      </Card>
    </div>
  );
};
