import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '@app/root';
import { initGlobalErrorHandler } from '@shared/lib/error-report';
import '@shared/styles/index.css';

if (!import.meta.env.DEV) initGlobalErrorHandler();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
