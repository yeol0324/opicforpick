import React from "react";

import { App } from "@app/root";
import ReactDOM from "react-dom/client";

import "@shared/styles/global.css";
import { initGlobalErrorHandler } from "@shared/lib/error-report";

if (!import.meta.env.DEV) initGlobalErrorHandler();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
