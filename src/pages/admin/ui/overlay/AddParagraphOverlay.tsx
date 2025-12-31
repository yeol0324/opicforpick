import { useState } from "react";

import {
  useGenerateSentence,
  type GenerateSentenceResponse,
} from "@features/ai-generate-sentence";

import { getThemeIdBySlug } from "@entities/theme";

import { supabase } from "@shared/api";
import type { Database } from "@shared/api/generated/database";
import { BaseButton, Card } from "@shared/ui";

type SentenceInputType = {
  position: number;
  type: number;
  eng: string;
  kor: string;
};

type SaveArgs =
  Database["public"]["Functions"]["save_paragraph_with_sentence"]["Args"];

type SaveArgsWithTypedSentences = Omit<SaveArgs, "p_sentences"> & {
  p_sentences: SentenceInputType[];
};

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
    topic: "daily",
    level: "Intermediate",
    userId,
  });
  const HandleGetGenerateSentence = async () => {
    const result = await generate();
    setGenerated(result);
  };
  const HandleUpdateSentence = async () => {
    if (!generated) return;
    const payload = {
      p_theme_id: await getThemeIdBySlug(generated.result.topic),
      p_title: generated.result.title,
      p_level: "Intermediate",
      p_sentences: generated?.result.sentences,
    } satisfies SaveArgsWithTypedSentences;

    /**
    1. sentences 문장 등록
    sentence_eng
    sentence_kor
    type - enum 0: 공통 1:질문 2: 문장
    level
    theme_id enum 0:

    2. paragraphs 등록
    title
    theme_id

    3. paragraph_sentences 등록
    paragraph_id
    sentence_id
    position
      */
    const { data, error } = await supabase.rpc(
      "save_paragraph_with_sentence",
      payload
    );
    if (error) console.error(error);
    else console.log(data);
  };
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
