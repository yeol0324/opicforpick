import { SentenceItem, type Sentence } from "@entities/sentence";

type Props = {
  sentences?: Sentence[];
};

export const Sentences = ({ sentences }: Props) => {
  return (
    <div>
      {sentences?.map((sentence, key) => (
        <SentenceItem sentence={sentence} key={key}></SentenceItem>
      ))}
    </div>
  );
};
