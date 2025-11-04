import { Outlet } from "react-router-dom";
import { AppHeader } from "@shared/ui";

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="mx-auto flex max-w-md flex-col px-4 pt-3 pb-20">
        <Outlet />
      </main>
    </div>
  );
}
