import { reportAppError } from '@shared/lib/error-report';

export function initGlobalErrorHandler() {
  if (window.__GLOBAL_ERROR_HANDLER_INITED__) return;
  window.__GLOBAL_ERROR_HANDLER_INITED__ = true;

  window.addEventListener('error', (event) => {
    const err = event.error as Error | undefined;

    reportAppError({
      error: err ?? event.message,
      source: 'global',
      severity: 'fatal',
      meta: {
        type: 'window.error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    reportAppError({
      error: event.reason ?? 'unhandledrejection',
      source: 'global',
      severity: 'error',
      meta: {
        type: 'unhandledrejection',
      },
    });
  });
}
