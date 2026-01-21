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

/**
 * Provides a `generate` function and `isLoading` flag for creating AI-generated sentences.
 *
 * @param params - Generation parameters and context. Must include `userId`; `topic` and `level` specify the sentence to generate.
 * @returns An object with:
 *  - `generate`: a function that requests a generated sentence and resolves to the generated response.
 *  - `isLoading`: `true` while a generation request is in progress, `false` otherwise.
 * @throws Error - Throws an Error with the message `"로그인이 필요합니다."` when `params.userId` is falsy.
 */
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