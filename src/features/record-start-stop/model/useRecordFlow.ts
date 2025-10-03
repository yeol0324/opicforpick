import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createRecorder } from "@shared/lib/audio/recorder-core";
import { createRecording } from "@entities/recording/api/create-recording";

type State = "idle" | "recording" | "saving";

export function useRecordFlow(sentenceId?: string, opts?: { maxMs?: number }) {
  const recorderRef = useRef(
    createRecorder({
      mime: "audio/webm",
      autoPauseOnHidden: true,
      timesliceMs: 250,
    })
  );
  const [state, setState] = useState<State>("idle");
  const [elapsedMs, setElapsedMs] = useState(0);
  const startedAtRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const saveMut = useMutation({
    mutationFn: (p: { blob: Blob; durationMs: number }) =>
      createRecording({ ...p, sentenceId }),
  });

  const tick = () => {
    if (startedAtRef.current == null) return;
    const now = performance.now();
    const ms = now - startedAtRef.current;
    setElapsedMs(ms);

    if (opts?.maxMs && ms >= opts.maxMs) {
      stopAndSave().catch(() => {
        /* swallow */
      });
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const start = async () => {
    await recorderRef.current.start();
    startedAtRef.current = performance.now();
    setElapsedMs(0);
    setState("recording");
    rafRef.current = requestAnimationFrame(tick);
  };

  const stopAndSave = async () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setState("saving");
    const { blob, durationMs } = await recorderRef.current.stop();
    await saveMut.mutateAsync({ blob, durationMs });
    startedAtRef.current = null;
    setElapsedMs(0);
    setState("idle");
  };

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const progress = opts?.maxMs ? Math.min(1, elapsedMs / opts.maxMs) : 0;

  return {
    state,
    start,
    stopAndSave,
    isSaving: saveMut.isPending,
    elapsedMs,
    progress,
    maxMs: opts?.maxMs,
  };
}
