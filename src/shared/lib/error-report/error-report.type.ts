export type ErrorSource = "route" | "render" | "global";

export type ErrorSeverity = "info" | "warning" | "error" | "fatal";

export type ReportErrorPayload = {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  source: ErrorSource;
  severity: ErrorSeverity;
  meta?: Record<string, unknown>;
};
