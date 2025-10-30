import { useFeedback } from "../model/useFeedback";

interface FeedbackPanelProps {
  audioBlob: Blob;
  referenceSentence?: string;
}

export function FeedbackPanel({
  audioBlob,
  referenceSentence,
}: FeedbackPanelProps) {
  const { feedback, isLoading, isError, submitFeedback } = useFeedback();

  const handleClick = () => {
    submitFeedback({
      audioBlob,
      referenceSentence,
      level: "Intermediate",
      recordingPath: "",
    });
  };

  if (isLoading) return <div>분석 중입니다.</div>;
  if (isError) return <div>피드백 요청 중 오류가 발생했습니다.</div>;

  return (
    <div>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        AI 피드백 받기
      </button>
      {feedback && <div></div>}
    </div>
  );
}
