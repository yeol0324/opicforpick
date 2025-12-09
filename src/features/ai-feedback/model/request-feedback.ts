import { blobToBase64 } from "@shared/lib";

import type { FeedbackResponse } from "./ai-feedback.type";

export type GetFeedbackParams = {
  question: string;
  audio: Blob;
  level?: string;
};

export async function requestFeedback(
  params: GetFeedbackParams
): Promise<FeedbackResponse> {
  const { question, audio, level } = params;

  // Blob → base64
  const audioBase64 = await blobToBase64(audio);
  const mimeType = audio.type || "audio/webm";

  const res = await fetch("/api/ai-feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      level,
      audioBase64,
      mimeType,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Feedback API failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  return res.json();
}
