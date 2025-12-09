// src/shared/ui/error-boundary/ErrorBoundary.tsx
import type { ReactNode, ErrorInfo } from "react";
import { Component } from "react";

import { reportAppError } from "@shared/lib/error-report";

import { ErrorFallback } from "./error-fallBack";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportAppError({
      error,
      source: "render",
      severity: "fatal",
      meta: {
        reactComponentStack: info.componentStack,
      },
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
