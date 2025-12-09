import { useCallback, useRef, useEffect } from "react";

type UseInfiniteScrollOptions = {
  onLoadMore: () => void;
  threshold?: number;
  enabled?: boolean;
};

export function useInfiniteScroll({
  onLoadMore,
  threshold = 200,
  enabled = true,
}: UseInfiniteScrollOptions) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const isAtBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - threshold;

    if (isAtBottom) {
      onLoadMore();
    }
  }, [enabled, threshold, onLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return containerRef;
}
