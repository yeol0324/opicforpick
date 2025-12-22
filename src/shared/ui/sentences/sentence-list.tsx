import { SentenceItem, type SentenceType } from "@entities/sentence";

type Props = {
  sentences?: SentenceType[];
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
