import type { ReactNode } from "react";

type AppErrorFallbackProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
};

export function ErrorFallback({
  title = "문제가 발생했어요.",
  description = "잠시 후 다시 시도해 주세요.",
  action,
}: AppErrorFallbackProps) {
  return (
    <div style={{ padding: 24 }}>
      <h1>{title}</h1>
      <p>{description}</p>
      {action}
    </div>
  );
}
