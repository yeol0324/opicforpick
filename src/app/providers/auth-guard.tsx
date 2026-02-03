import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthContext } from '@entities/auth';

import { Spinner } from '@shared/ui';

type AuthGuardProps = {
  /**
   * Whether the routes should require authentication
   * - true (default): Requires authentication. Redirects to redirectTo if not authenticated.
   * - false: Requires no authentication. Redirects to redirectTo if authenticated.
   */
  requireAuth?: boolean;
  /**
   * Path to redirect to when guard condition fails
   * - Default: '/login' when requireAuth is true
   * - Default: '/' when requireAuth is false
   */
  redirectTo?: string;
};

export const AuthGuard = ({
  requireAuth = true,
  redirectTo,
}: AuthGuardProps) => {
  const { isAuthed, isLoading } = useAuthContext();
  const location = useLocation();

  // Set default redirectTo based on requireAuth
  const defaultRedirect = requireAuth ? '/login' : '/';
  const targetRedirect = redirectTo ?? defaultRedirect;

  if (isLoading) return <Spinner />;

  // Protect authenticated routes: redirect to login if not authenticated
  if (requireAuth && !isAuthed) {
    return (
      <Navigate
        to={targetRedirect}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  // Protect public routes: redirect to home if authenticated
  if (!requireAuth && isAuthed) {
    return <Navigate to={targetRedirect} replace />;
  }

  return <Outlet />;
};
