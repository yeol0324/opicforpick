import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "recording" | "stopped" | "error";

export function useRecorder(maxSeconds = 300) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopTracks = () => {
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
  };

  const startTimer = () => {
    setSeconds(0);
    clearTimer();
    timerRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev + 1 >= maxSeconds) {
          stop();
        }
        return prev + 1;
      });
    }, 1000);
  };

  const start = useCallback(async () => {
    try {
      setError(null);
      setAudioUrl((url) => {
        if (url) URL.revokeObjectURL(url);
        return null;
      });
      chunksRef.current = [];

      // 마이크 권한 + 스트림
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // 브라우저에 맞는 mimeType 선택 (Safari 대응 위해 옵션 없이 시도하고, 실패 시 기본)
      let recorder: MediaRecorder;
      try {
        recorder = new MediaRecorder(stream);
      } catch {
        // 특정 코덱 강제 예시 (필요 시): { mimeType: "audio/webm" }
        recorder = new MediaRecorder(stream);
      }

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        clearTimer();
        stopTracks();
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setStatus("stopped");
      };

      recorder.start(); // 기본 timeslice 없음: onstop에서 blob 합침
      setStatus("recording");
      startTimer();
    } catch (err: any) {
      setError(err?.message ?? "Failed to start recording");
      setStatus("error");
      stopTracks();
      clearTimer();
    }
  }, []);

  const stop = useCallback(() => {
    try {
      mediaRecorderRef.current?.state === "recording" &&
        mediaRecorderRef.current.stop();
    } catch (err: any) {
      setError(err?.message ?? "Failed to stop recording");
      setStatus("error");
      stopTracks();
      clearTimer();
    }
  }, []);

  const reset = useCallback(() => {
    // 재녹음
    setStatus("idle");
    setError(null);
    setSeconds(0);
    chunksRef.current = [];
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  }, [audioUrl]);

  // 언마운트 시 정리
  useEffect(() => {
    return () => {
      clearTimer();
      stopTracks();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  return {
    status, // "idle" | "recording" | "stopped" | "error"
    error,
    seconds,
    audioUrl, // 재생/다운로드에 사용
    start,
    stop,
    reset,
    maxSeconds,
  };
}
