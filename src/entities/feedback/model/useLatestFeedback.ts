import { useQuery } from "@tanstack/react-query";
import { getLatestFeedback } from "../api/get-latest-feedback";

export function useLatestFeedback(userId: string) {
  return useQuery({
    queryKey: ["feedback", "latest", userId],
    queryFn: () => getLatestFeedback(userId),
    enabled: !!userId,
  });
}
