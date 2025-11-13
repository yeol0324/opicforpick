import { useMutation } from "@tanstack/react-query";
import { sttFromMic } from "../api/sttFromMic";

export function useSttFromMic() {
  const mutation = useMutation({
    mutationFn: () => sttFromMic("en-US"),
  });

  return {
    text: mutation.data ?? "",
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    requestStt: mutation.mutate, // 콜백 스타일
    requestSttAsync: mutation.mutateAsync, // await 스타일
    reset: mutation.reset,
  };
}
