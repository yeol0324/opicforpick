import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { wordQueries } from '@entities/word';
import type { WordType } from '@entities/word';
import { useInfiniteScroll, APP } from '@shared/lib';
import { Card, Spinner } from '@shared/ui';

import { WordbookOverlay } from './wordbook.overlay';

export function Wordbook() {
  const pageSize = APP.DEFAULT_PAGE_SIZE;

  const wordsQuery = useInfiniteQuery({
    ...wordQueries.infiniteList({ pageSize }),
  });

  const words =
    wordsQuery.data?.pages
      .flatMap((page) => page.items as WordType[])
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.id === item.id),
      ) ?? [];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const open = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const hasMore = wordsQuery.hasNextPage;
  const isLoading = wordsQuery.isLoading;
  const hasError = !!wordsQuery.error;

  const onIntersect = () => {
    if (wordsQuery.isFetchingNextPage || hasError || !hasMore) return;
    wordsQuery.fetchNextPage();
  };

  const { setTarget } = useInfiniteScroll({
    onIntersect,
    enabled: !wordsQuery.isFetchingNextPage && !hasError && !!hasMore,
  });

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <h2 className="text-lg font-semibold text-slate-900">단어장 📕</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <Card className="min-h-0 flex-1 overflow-y-auto" mode="scroll">
          <ul>
            {words.map((word, idx) => (
              <li
                className={[
                  'cursor-pointer rounded-md p-2 transition-colors',
                  'hover:bg-slate-100',
                ].join(' ')}
                key={word.id}
                onClick={() => open(idx)}
              >
                <span> {word.expression}</span>
                <span> {word.meaning}</span>
              </li>
            ))}
          </ul>
          {wordsQuery.isFetchingNextPage && <Spinner />}
          <div ref={setTarget} className="h-10" />
        </Card>
      )}

      {isOpen && (
        <WordbookOverlay
          word={words[currentIndex]}
          index={currentIndex}
          total={words.length}
          onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
          onNext={() =>
            setCurrentIndex((i) => Math.min(i + 1, words.length - 1))
          }
          onClose={close}
        />
      )}
    </div>
  );
}
