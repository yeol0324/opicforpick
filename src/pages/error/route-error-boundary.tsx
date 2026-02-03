import { useEffect, useRef } from 'react';

import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from 'react-router-dom';

import { reportAppError } from '@shared/lib/error-report';
import { ErrorFallback } from '@shared/ui/status';

export function RouteErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();
  const reportedRef = useRef(false);

  useEffect(() => {
    if (!error) return;
    if (reportedRef.current) return;
    reportedRef.current = true;

    reportAppError({
      error,
      source: 'route',
      severity: 'error',
      meta: {
        pathname: location.pathname,
        search: location.search,
        isRouteErrorResponse: isRouteErrorResponse(error),
      },
    });
  }, [error, location.pathname, location.search]);

  return <ErrorFallback />;
}
