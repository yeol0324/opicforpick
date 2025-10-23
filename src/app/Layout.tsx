// apps/web/src/app/Layout.tsx
import { Outlet } from "react-router-dom";
import { NavBar } from "@shared/ui/NavBar";

export function Layout() {
  return (
    <div className="h-screen">
      <NavBar />
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
