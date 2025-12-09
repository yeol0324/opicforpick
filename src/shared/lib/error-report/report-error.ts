import type { ReportErrorPayload } from "./error-report.type";

export async function reportErrorToServer(payload: ReportErrorPayload) {
  try {
    await fetch("/api/report-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("failed to report error", e);
  }
}
