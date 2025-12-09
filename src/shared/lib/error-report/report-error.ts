import type { ReportErrorPayload } from "./error-report.type";

export type ReportErrorResult = {
  issueUrl?: string;
};

export async function reportErrorToServer(
  payload: ReportErrorPayload
): Promise<ReportErrorResult> {
  const response = await fetch("/api/report-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `reportErrorToServer failed (${response.status}): ${
        text || response.statusText
      }`
    );
  }

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text) as ReportErrorResult;
  } catch {
    return {};
  }
}
