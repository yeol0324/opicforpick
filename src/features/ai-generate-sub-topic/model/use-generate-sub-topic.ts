import { useState } from 'react';

import type {
  GenerateSubTopicRequest,
  GenerateSubTopicResponse,
} from './ai-generate-sub-topic.type';
import { requestGenerateSubTopic } from './request-generate-sub-topic';

type UseGenerateSubTopicParam = GenerateSubTopicRequest;
type UseGenerateSubTopicResult = {
  generate: () => Promise<GenerateSubTopicResponse>;
  isLoading: boolean;
};

export function useGenerateSubTopic(
  params: UseGenerateSubTopicParam,
): UseGenerateSubTopicResult {
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    setIsLoading(true);
    try {
      const generatedSubTopics = await requestGenerateSubTopic(params);
      return generatedSubTopics;
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading };
}
