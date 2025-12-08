import type { FeedbackContentType } from "@entities/feedback";
import { CircleProgress } from "@shared/ui";

interface FeedbackPanelProps {
  feedback: FeedbackContentType | null;
}

function ScoreCircle({ label, score }: { label: string; score?: number }) {
  const safeScore = score ?? 0;

  return (
    <div className="flex items-center gap-2 my-2">
      <div className="relative grid place-items-center w-[64px] h-[64px]">
        <CircleProgress progress={safeScore / 100} size={64} />
        <div className="absolute text-xs text-black">
          {label} : {safeScore}
        </div>
      </div>
    </div>
  );
}

export function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  if (!feedback) return null;

  return (
    <>
      {/* <div>
        <span className="font-semibold">내 답변</span>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {transcript}
        </p>
      </div> */}
      <div>
        <span className="font-semibold">총평</span>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {feedback.overallComment}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <ScoreCircle label="발음" score={feedback.pronunciationScore} />
        <p className="text-sm">{feedback.pronunciationComment}</p>
        <ScoreCircle label="문법" score={feedback.grammarScore} />
        <p className="text-sm">{feedback.grammarComment}</p>
        <ScoreCircle label="단어" score={feedback.vocabularyScore} />
        <p className="text-sm">{feedback.vocabularyComment}</p>
        <ScoreCircle label="내용" score={feedback.contentScore} />
        <p className="text-sm">{feedback.contentComment}</p>
      </div>
    </>
  );
}
