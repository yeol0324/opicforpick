// 시작/정지, 타이머, 상태
import { RecorderButton } from "@shared/ui/RecorderButton";
import { useRecordFlow } from "../model/useRecordFlow";

export const RecordController = ({ sentenceId }: { sentenceId?: string }) => {
  const { state, start, stopAndSave } = useRecordFlow(sentenceId);
  return (
    <div>
      <RecorderButton
        onStart={start}
        onStop={stopAndSave}
        disabled={state === "saving"}
      />
      <span>{state}</span>
    </div>
  );
};
