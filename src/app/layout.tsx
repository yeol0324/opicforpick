import { Outlet } from 'react-router-dom';

import { AppHeader, BottomNav } from '@shared/ui';

export function Layout() {
  return (
    <div className="flex h-[100dvh] min-w-sm flex-col overflow-hidden bg-neutral-50">
      <AppHeader />
      <main className="flex-1 overflow-hidden pt-header pb-nav">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
