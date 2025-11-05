import type { FeedbackResponse } from "../model/types";

export type GetFeedbackParams = {
  question: string;
  transcript: string;
  level?: string;
};

export async function getFeedback(
  params: GetFeedbackParams
): Promise<FeedbackResponse> {
  const res = await fetch("/api/ai-feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Feedback API failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  return res.json();
}
