import type { SentenceType } from "../model/sentence.type";

type Props = {
  sentence: SentenceType;
};

export const SentenceItem = ({ sentence }: Props) => {
  if (!sentence) return <div>x</div>;
  return <div>{sentence.sentence_eng}</div>;
};

