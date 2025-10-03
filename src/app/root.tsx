import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createQueryClient } from "@app/providers/query-client";
import { router } from "./routes";
import { useState } from "react";
// import { Header } from "@shared/ui";

export function App() {
  const [client] = useState(() => createQueryClient());
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
