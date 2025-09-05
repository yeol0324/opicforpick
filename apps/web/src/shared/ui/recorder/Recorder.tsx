import { useRef } from "react";
import { useRecorder } from "./useRecorder";
import { formatTime } from "./formatTime";

type Props = {
  maxSeconds?: number; // default 5분
};

export function Recorder({ maxSeconds = 300 }: Props) {
  const { status, error, seconds, audioUrl, start, stop, reset } =
    useRecorder(maxSeconds);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const canStart = status === "idle" || status === "stopped";
  const canStop = status === "recording";

  return (
    <div className="w-full max-w-md rounded-xl border p-4">
      <h2 className="text-lg font-semibold">녹음</h2>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-lg tabular-nums">
          {formatTime(seconds)} / {formatTime(maxSeconds)}
        </span>
      </div>

      {error && (
        <p className="mt-2 rounded bg-red-50 p-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* 버튼 */}
      <div className="mt-4 flex gap-2">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          onClick={() => (status === "stopped" ? reset() : start())}
          disabled={!canStart}
        >
          {status === "stopped" ? "다시 녹음" : "녹음하기"}
        </button>

        <button
          className="rounded-lg bg-slate-200 px-4 py-2 hover:bg-slate-300 disabled:opacity-50"
          onClick={stop}
          disabled={!canStop}
        >
          정지
        </button>
      </div>

      {/* 결과(재생/다운로드) */}
      {audioUrl && status !== "recording" && (
        <div className="mt-5 space-y-3">
          <audio ref={audioRef} src={audioUrl} controls className="w-full" />
          <div className="flex gap-2">
            <a
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
              href={audioUrl}
              download={`recording-${Date.now()}.webm`}
            >
              다운로드
            </a>
            <button
              className="rounded-lg bg-slate-200 px-4 py-2 hover:bg-slate-300"
              onClick={() => audioRef.current?.play()}
            >
              재생
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
