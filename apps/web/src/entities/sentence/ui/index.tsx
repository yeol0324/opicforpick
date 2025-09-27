import type { Sentence } from "../types";

type Props = {
  sentence?: Sentence;
};

export function SentenceItem({ sentence }: Props) {
  if (!sentence) return <div>x</div>;
  return <div>{sentence.text_en}</div>;
}
