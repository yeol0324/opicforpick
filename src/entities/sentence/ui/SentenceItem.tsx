import type { Sentence } from "../model/types";

type Props = {
  sentence: Sentence;
};

export const SentenceItem = ({ sentence }: Props) => {
  if (!sentence) return <div>x</div>;
  return <div>{sentence.sentence_eng}</div>;
};
