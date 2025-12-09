import type { ReactNode } from "react";

import { ErrorBoundary } from "@shared/ui/status/error-boundary";

export function ErrorBoundaryProvider({ children }: { children: ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
