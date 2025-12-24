import { useCallback, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(
    (event: Event) => {
      if (!enabled) return;
      console.log("handleScroll");

      const target = event.target as HTMLDivElement | null;
      const container = target ?? containerRef.current;
      if (!container) return;

      const isAtBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - threshold;

      if (isAtBottom) {
        onLoadMore();
      }
    },
    [enabled, threshold, onLoadMore]
  );

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }

      containerRef.current = node;

      if (node && enabled) {
        node.addEventListener("scroll", handleScroll);
      }
    },
    [enabled, handleScroll]
  );

  return setRef;
}
