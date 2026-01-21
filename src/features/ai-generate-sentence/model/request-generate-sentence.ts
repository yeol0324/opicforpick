import type {
  GenerateSentenceResponse,
  GenerateSentenceRequest,
} from "./ai-generate-sentence.type";

/**
 * Send a POST request to the sentence-generation API for a given topic and level.
 *
 * @param params - Request object containing generation parameters (`topic` and `level`)
 * @returns The parsed `GenerateSentenceResponse` returned by the API
 * @throws Error if the API response has a non-OK status; the error message includes the HTTP status, status text, and any response body text
 */
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