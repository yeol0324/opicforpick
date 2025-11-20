import { Spinner } from "@shared/ui";
import { useFeedback } from "../model/useFeedback";
import type { Sentence } from "@entities/sentence";

interface FeedbackPanelProps {
  audioBlob: Blob;
  question: Sentence;
}

export function FeedbackPanel({ audioBlob, question }: FeedbackPanelProps) {
  const { feedback, isLoading, isError, submitFeedback } = useFeedback();

  const handleClick = () => {
    submitFeedback({
      audioBlob,
      question,
      level: "Intermediate",
    });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>피드백 요청 중 오류가 발생했습니다.</div>;

  return (
    <div>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        AI 피드백 받기
      </button>
      {feedback && (
        <div>
          <span>내 답변</span>
          <p>{feedback.transcript}</p>
          <span>총평</span>
          <p>{feedback.result.overallComment}</p>
          <span>발음 : {feedback.result.pronunciationScore}</span>
          <p>{feedback.result.pronunciationComment}</p>
          <span>문법 : {feedback.result.grammarScore}</span>
          <p>{feedback.result.vocabularyComment}</p>
          <span>단어 : {feedback.result.vocabularyScore}</span>
          <p>{feedback.result.grammarComment}</p>
          <span>내용 : {feedback.result.contentScore}</span>
          <p>{feedback.result.contentComment}</p>
        </div>
      )}
    </div>
  );
}
