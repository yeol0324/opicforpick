import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Eager loading
import { Layout } from '@app/layout';
import { AuthGuard } from '@app/providers/auth-guard';
import { Login } from '@pages/login';
import { Home } from '@pages/home';

import { Spinner } from '@shared/ui';

// Lazy loading
const RouteErrorBoundary = lazy(() =>
  import('@pages/error/route-error-boundary').then((m) => ({
    default: m.RouteErrorBoundary,
  })),
);

const PracticePage = lazy(() =>
  import('@pages/practice').then((m) => ({ default: m.Practice })),
);
const MyRecordsPage = lazy(() =>
  import('@pages/my-records').then((m) => ({ default: m.MyRecords })),
);
const WordbookPage = lazy(() =>
  import('@pages/wordbook').then((m) => ({
    default: m.Wordbook,
  })),
);
const ProfilePage = lazy(() =>
  import('@pages/profile').then((m) => ({
    default: m.ProfilePage,
  })),
);
const AdminPage = lazy(() =>
  import('@pages/admin').then((m) => ({
    default: m.AdminPage,
  })),
);

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthGuard requireAuth={false} />,
    errorElement: (
      <Suspense fallback={<Spinner />}>
        <RouteErrorBoundary />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    element: <Layout />,
    errorElement: (
      <Suspense fallback={<Spinner />}>
        <RouteErrorBoundary />
      </Suspense>
    ),
    children: [
      {
        element: <AuthGuard />,
        children: [
          { index: true, path: '/', element: <Home /> },
          {
            path: '/my-record',
            element: (
              <Suspense fallback={<Spinner />}>
                <MyRecordsPage />
              </Suspense>
            ),
          },
          {
            path: '/wordbook',
            element: (
              <Suspense fallback={<Spinner />}>
                <WordbookPage />
              </Suspense>
            ),
          },
          {
            path: '/practice',
            element: (
              <Suspense fallback={<Spinner />}>
                <PracticePage />
              </Suspense>
            ),
          },
          {
            path: '/profile',
            element: (
              <Suspense fallback={<Spinner />}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: '/admin',
            element: (
              <Suspense fallback={<Spinner />}>
                <AdminPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
