import { reportErrorToServer } from "./report-error";
import type {
  ErrorSource,
  ErrorSeverity,
  ReportErrorPayload,
} from "./error-report.type";

type ReportAppErrorParams =
  | {
      error: unknown;
      message?: never;
      stack?: never;
      source: ErrorSource;
      severity?: ErrorSeverity;
      meta?: Record<string, unknown>;
    }
  | {
      error?: never;
      message: string;
      stack?: string;
      source: ErrorSource;
      severity?: ErrorSeverity;
      meta?: Record<string, unknown>;
    };

function normalizeError(
  params: ReportAppErrorParams
): Pick<ReportErrorPayload, "message" | "stack"> {
  if ("error" in params && params.error !== undefined) {
    const err = params.error;
    if (err instanceof Error) {
      return {
        message: err.message,
        stack: err.stack,
      };
    }
    return {
      message: String(err),
      stack: undefined,
    };
  }

  return {
    message: params.message ?? "",
    stack: params.stack,
  };
}

export function reportAppError(params: ReportAppErrorParams) {
  if (import.meta.env.DEV) {
    const { message, stack } = normalizeError(params);
    console.error("[AppError][DEV]", {
      source: params.source,
      severity: params.severity ?? "error",
      message,
      stack,
      meta: params.meta,
    });
    return;
  }

  const { source, severity = "error", meta } = params;
  const { message, stack } = normalizeError(params);

  const payload: ReportErrorPayload = {
    message,
    stack,
    source,
    severity,
    url: typeof window !== "undefined" ? window.location.href : "N/A",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "N/A",
    meta,
  };

  void reportErrorToServer(payload);
}
