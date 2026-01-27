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
    const text = await response.text().catch(() => '');
    let message = 'Failed to generate sub-topics';
    try {
      const errorData = JSON.parse(text);
      message = errorData.error || message;
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }

  return response.json();
}
