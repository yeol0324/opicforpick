import { Recorder } from "@shared/ui/recorder";
import { RandomSentenceBox } from "@features/random-sentence/ui/RandomSentenceBox";

export function HomePage() {
  //TODO: theme 추가
  return (
    <>
      <RandomSentenceBox type={1} />
      <Recorder maxSeconds={300} />
    </>
  );
}
