import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@app/root";
import "@shared/styles/global.css";
import { initGlobalErrorHandler } from "@shared/lib/error-report";

initGlobalErrorHandler();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
