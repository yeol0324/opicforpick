import { RandomSentenceBox } from "@features/random-sentence/ui/RandomSentenceBox";
import { RecordController } from "@features/record-start-stop";

export function HomePage() {
  //TODO: theme 추가
  return (
    <>
      <RandomSentenceBox type={1} />
      <RecordController />
    </>
  );
}
