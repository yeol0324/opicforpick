import { useState } from "react";

import type {
  GenerateSentenceRequest,
  GenerateSentenceResponse,
} from "./ai-generate-sentence.type";
import { requestGenerateSentence } from "./request-generate-sentence";

type UseGenerateSentenceParam = GenerateSentenceRequest;
type UseGenerateSentenceResult = {
  generate: () => Promise<GenerateSentenceResponse>;
  isLoading: boolean;
};

export function useGenerateSentence(
  params: UseGenerateSentenceParam & { userId: string | null }
): UseGenerateSentenceResult {
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    if (!params.userId) {
      throw new Error("로그인이 필요합니다.");
    }

    try {
      setIsLoading(true);

      const generatedSentence = await requestGenerateSentence({
        topic: params.topic,
        level: params.level,
      });

      return generatedSentence;
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading };
}
