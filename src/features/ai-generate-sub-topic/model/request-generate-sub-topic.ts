import type {
  GenerateSubTopicRequest,
  GenerateSubTopicResponse,
} from './ai-generate-sub-topic.type';

export async function requestGenerateSubTopic(
  params: GenerateSubTopicRequest,
): Promise<GenerateSubTopicResponse> {
  const response = await fetch('/api/ai-generate-sub-topic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate sub-topics');
  }

  return response.json();
}
