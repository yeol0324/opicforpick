import { SentenceItem, type SentenceRow } from "@entities/sentence";

type Props = {
  sentences?: SentenceRow[];
};

export const SentenceList = ({ sentences }: Props) => {
  return (
    <div>
      {sentences?.map((sentence, key) => (
        <SentenceItem sentence={sentence} key={key}></SentenceItem>
      ))}
    </div>
  );
};
