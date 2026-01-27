import type {
  GenerateSentenceResponse,
  GenerateSentenceRequest,
} from './ai-generate-sentence.type';

export async function requestGenerateSentence(
  params: GenerateSentenceRequest,
): Promise<GenerateSentenceResponse> {
  const { topic, subTopic, level } = params;

  const response = await fetch('/api/ai-generate-sentence', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      topic,
      subTopic,
      level,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    let message = 'Failed to generate sentence';
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
