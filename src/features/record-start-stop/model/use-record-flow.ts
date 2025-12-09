import { useEffect, useRef, useState } from "react";

import { createRecorder, getNow } from "@shared/lib";

type State = "idle" | "recording" | "preview" | "saving";
export type AudioInfo = {
  blob: Blob;
  durationMs: number;
};
type UseRecordFlowParams = {
  onComplete: (info: AudioInfo) => void;
  onReset: () => void;
  maxMs?: number;
};
const DEFAULT_MAX_MS = 2 * 60 * 1000; // 2분

export function useRecordFlow({
  onComplete,
  onReset,
  maxMs = DEFAULT_MAX_MS,
}: UseRecordFlowParams) {
  const recorderRef = useRef(
    createRecorder({
      autoPauseOnHidden: true,
      timesliceMs: 250,
    })
  );

  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [audioInfo, setAudioInfo] = useState<AudioInfo | null>(null);

  const startedAtRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const tick = () => {
    if (startedAtRef.current == null) return;
    const now = getNow();
    const ms = now - startedAtRef.current;
    setElapsedMs(ms);

    if (maxMs && ms >= maxMs) {
      stop().catch(() => {
        /* swallow */
      });
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const start = async () => {
    setError(null); // 이전 에러 초기화

    try {
      await recorderRef.current.start();
    } catch (error: unknown) {
      let message = "녹음을 실패했습니다.";
      if (error instanceof Error && error.message) {
        message = error.message;
      }
      setError(message);
      return;
    }

    startedAtRef.current = getNow();
    setElapsedMs(0);
    setState("recording");
    rafRef.current = requestAnimationFrame(tick);
  };

  const stop = async () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const { blob, durationMs } = await recorderRef.current.stop();

    const result = { blob, durationMs };
    setAudioInfo(result);
    onComplete?.(result);
    startedAtRef.current = null;
    setElapsedMs(0);
    setState("preview");
  };

  const retry = () => {
    setAudioInfo(null);
    setElapsedMs(0);
    setState("idle");
    onReset();
  };

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const progress = maxMs ? Math.min(1, elapsedMs / maxMs) : 0;

  return {
    state,
    start,
    stop,
    retry,
    audioInfo,
    elapsedMs,
    progress,
    maxMs: maxMs,
    error,
  };
}
