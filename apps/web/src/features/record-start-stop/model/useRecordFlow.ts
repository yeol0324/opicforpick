import { createRecorder } from "@shared/lib/audio/recorder-core";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { recordingApi } from "@entities/recording";

export function useRecordFlow(sentenceId?: string) {
  const recRef = useRef(createRecorder({ mime: "audio/webm" }));
  const [state, setState] = useState<"idle" | "recording" | "saving">("idle");

  const saveMut = useMutation({
    mutationFn: (data: { blob: Blob; durationMs: number }) =>
      recordingApi.createRecording({ sentenceId, ...data }),
  });

  const start = async () => {
    await recRef.current.start();
    setState("recording");
  };
  const stopAndSave = async () => {
    setState("saving");
    const { blob, durationMs } = await recRef.current.stop();
    await saveMut.mutateAsync({ blob, durationMs });
    setState("idle");
  };

  return { state, start, stopAndSave, isSaving: saveMut.isPending };
}
