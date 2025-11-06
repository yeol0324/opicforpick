import { QueryClient } from "@tanstack/react-query";
import { SupabaseError } from "@shared/api";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (count, error) => {
          if (error instanceof SupabaseError) {
            if ([401, 403, 404].includes(error.status ?? 0)) return false;
          }
          return count < 2;
        },
      },
      mutations: { retry: 0 },
    },
  });
}
