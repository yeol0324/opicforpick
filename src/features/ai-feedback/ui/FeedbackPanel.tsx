import { CircleProgress } from "@shared/ui";

interface FeedbackResult {
  overallComment: string;
  pronunciationScore?: number;
  pronunciationComment?: string;
  grammarScore?: number;
  grammarComment?: string;
  vocabularyScore?: number;
  vocabularyComment?: string;
  contentScore?: number;
  contentComment?: string;
}

interface FeedbackData {
  transcript: string;
  result: FeedbackResult;
}

interface FeedbackPanelProps {
  feedback: FeedbackData | null;
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

  const { transcript, result } = feedback;

  return (
    <section className="flex flex-col gap-4">
      <div>
        <span className="font-semibold">내 답변</span>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {transcript}
        </p>
      </div>

      <div>
        <span className="font-semibold">총평</span>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {result.overallComment}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <ScoreCircle label="발음" score={result.pronunciationScore} />
        <p className="text-sm">{result.pronunciationComment}</p>
        <ScoreCircle label="문법" score={result.grammarScore} />
        <p className="text-sm">{result.grammarComment}</p>
        <ScoreCircle label="단어" score={result.vocabularyScore} />
        <p className="text-sm">{result.vocabularyComment}</p>
        <ScoreCircle label="내용" score={result.contentScore} />
        <p className="text-sm">{result.contentComment}</p>
      </div>
    </section>
  );
}
