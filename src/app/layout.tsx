import { Outlet } from "react-router-dom";

import { AppHeader, BottomNav } from "@shared/ui";

export function Layout() {
  return (
    <div
      className="flex h-[100dvh] flex-col overflow-hidden bg-slate-50"
      style={{
        ["--header-h" as string]: "56px",
        ["--nav-h" as string]: "56px",
      }}
    >
      <AppHeader />
      <main
        className="mx-auto flex w-full max-w-md flex-col overflow-y-auto px-4"
        style={{
          height: "calc(100dvh - var(--header-h) - var(--nav-h))",
          marginTop: "var(--header-h)",
        }}
      >
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
