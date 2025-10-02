// apps/web/src/app/Layout.tsx
import { Outlet } from "react-router-dom";
import { NavBar } from "@shared/ui/NavBar";

export function Layout() {
  return (
    <>
      <NavBar />
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </>
  );
}
