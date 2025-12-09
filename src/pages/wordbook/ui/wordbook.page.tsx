import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { wordQueries } from "@entities/word/api/word.queries";

import { Card } from "@shared/ui";


import { WordDetailOverlay } from "./wordbook.overlay";


export function Wordbook() {
  const { data } = useQuery(wordQueries.list());
  const items = data?.items ?? [];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const open = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <>
      <div className="flex flex-col items-center gap-6 p-6">
        <section className="space-y-4 w-full">
          <h2 className="text-lg font-semibold text-slate-900">단어장 📕</h2>

          <Card>
            <ul>
              {items.map((word, idx) => (
                <li
                  className={[
                    "cursor-pointer rounded-md p-2 transition-colors",
                    "hover:bg-slate-100",
                  ].join(" ")}
                  key={word.id}
                  onClick={() => open(idx)}
                >
                  <span> {word.expression}</span>
                  <span> {word.meaning}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>
      {isOpen && (
        <WordDetailOverlay
          word={items[currentIndex]}
          index={currentIndex}
          total={items.length}
          onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
          onNext={() =>
            setCurrentIndex((i) => Math.min(i + 1, items.length - 1))
          }
          onClose={close}
        />
      )}
    </>
  );
}
