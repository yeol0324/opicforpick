import type { SentenceRow } from "@entities/sentence";

type Props = {
  sentence: SentenceRow;
};

export const SentenceItem = ({ sentence }: Props) => {
  if (!sentence) return <div>x</div>;
  return <div>{sentence.sentence_eng}</div>;
};
