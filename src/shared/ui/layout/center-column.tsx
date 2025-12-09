import type { ReactNode } from "react";

interface CenterColumnProps {
  children: ReactNode;
  /**기본 md, 필요하면 lg*/
  maxWidthClassName?: string;
}

export function CenterColumn({
  children,
  maxWidthClassName = "max-w-md",
}: CenterColumnProps) {
  return (
    <main className="min-h-screen bg-white">
      <div
        className={`mx-auto flex min-h-[calc(100vh-4rem)] ${maxWidthClassName} flex-col justify-center px-4 pb-12 pt-10`}
      >
        {children}
      </div>
    </main>
  );
}
