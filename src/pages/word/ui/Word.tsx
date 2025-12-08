import { Card } from "@shared/ui";
import { WordDetailOverlay } from "./WordDetailOverlay";
import { useQuery } from "@tanstack/react-query";
import { wordQueries } from "@entities/word/api/word.queries";
import { useState } from "react";

export function Word() {
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
      <Card>
        <ul>
          {items.map((word, idx) => (
            <li key={word.id} onClick={() => open(idx)}>
              {word.expression}
            </li>
          ))}
        </ul>
      </Card>

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
