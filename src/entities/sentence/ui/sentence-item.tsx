import type { SentenceRow } from "../model/sentence.type";

type Props = {
  sentence: SentenceRow;
};

export const SentenceItem = ({ sentence }: Props) => {
  if (!sentence) return <div>x</div>;
  return <div>{sentence.sentence_eng}</div>;
};
