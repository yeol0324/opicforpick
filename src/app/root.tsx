import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createQueryClient } from "@app/providers/queryClient";
import { router } from "./routes";
import { useState } from "react";
import { AuthProvider } from "./providers/authProvider";

export function App() {
  const [client] = useState(() => createQueryClient());
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
