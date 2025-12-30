import { useState } from "react";

import {
  useGenerateSentence,
  type GenerateSentenceResponse,
} from "@features/ai-generate-sentence";

import { BaseButton, Card } from "@shared/ui";

type AddParagraphlOverlayProps = {
  userId: string;
  onClose: () => void;
};
export const AddParagraphOverlay = ({
  userId,
  onClose,
}: AddParagraphlOverlayProps) => {
  const [generated, setGenerated] = useState<GenerateSentenceResponse>();
  const { generate, isLoading } = useGenerateSentence({
    topic: "",
    level: "Intermediate",
    userId,
  });
  const HandleGetGenerateSentence = async () => {
    const result = await generate();
    setGenerated(result);
  };
  const HandleUpdateSentence = async () => {};
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm  max-h-[80dvh] rounded-2xl bg-white p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>문단 추가</h1>
        <Card>
          <BaseButton onClick={HandleGetGenerateSentence} disabled={isLoading}>
            AI로 문단 생성하기
          </BaseButton>
          {generated && (
            <>
              <article className="h-100 m-2 overflow-scroll">
                <p>{generated?.result.topic}</p>
                <ul>
                  {generated?.result.sentences.map((sentence) => (
                    <li>
                      <span>{sentence.eng}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <BaseButton onClick={HandleUpdateSentence} disabled={isLoading}>
                문단 세트 저장하기
              </BaseButton>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};
