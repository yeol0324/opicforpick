import type {
  GenerateSentenceResponse,
  GenerateSentenceRequest,
} from "./ai-generate-sentence.type";

export async function requestGenerateSentence(
  params: GenerateSentenceRequest
): Promise<GenerateSentenceResponse> {
  const { topic, level } = params;

  const res = await fetch("/api/ai-generate-sentence", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic,
      level,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Generate Sentence API failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  return res.json();
}
