import type { ReactNode } from "react";

import { ErrorBoundary } from "@shared/ui/status/ErrorBoundary";

export function ErrorBoundaryProvider({ children }: { children: ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
