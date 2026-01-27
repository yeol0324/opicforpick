import { useState } from 'react';

import { createQueryClient } from '@app/providers/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { OverlayProvider } from 'overlay-kit';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './providers/auth-provider';
import { ErrorBoundaryProvider } from './providers/error-provider';
import { router } from './routes';

export function App() {
  const [client] = useState(() => createQueryClient());
  return (
    <ErrorBoundaryProvider>
      <QueryClientProvider client={client}>
        <OverlayProvider>
          <AuthProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </OverlayProvider>
      </QueryClientProvider>
    </ErrorBoundaryProvider>
  );
}
