// apps/web/src/app/Layout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "@shared/ui/Header";
import { TabBar } from "@shared/ui/TabBar";

export function Layout() {
  return (
    <>
      <Header />
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
      <TabBar />
    </>
  );
}
