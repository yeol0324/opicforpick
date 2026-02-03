import { useEffect, useState } from 'react';

import {
  INFINITE_SCROLL_THRESHOLD,
  INFINITE_SCROLL_ROOT_MARGIN,
} from '@shared/lib';

type UseInfiniteScrollOptions = {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function useInfiniteScroll({
  onIntersect,
  enabled = true,
  threshold = INFINITE_SCROLL_THRESHOLD,
  rootMargin = INFINITE_SCROLL_ROOT_MARGIN,
}: UseInfiniteScrollOptions) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!target || !enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].intersectionRatio <= 0) return;
        onIntersect();
      },
      { threshold, rootMargin },
    );
    observer.observe(target);
  }, [target, enabled, onIntersect, threshold, rootMargin]);

  return { setTarget };
}
