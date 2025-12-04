import { fixWebmDuration } from "@fix-webm-duration/fix";
import type {
  Recorder,
  RecorderOptions,
  RecordingBlob,
  RecordingMime,
  RecorderError,
  RecorderState,
} from "./types";

function pickMime(preferred?: RecordingMime): RecordingMime {
  const supported = (t: string) =>
    typeof MediaRecorder !== "undefined" &&
    typeof MediaRecorder.isTypeSupported === "function" &&
    MediaRecorder.isTypeSupported(t);

  if (preferred && supported(preferred)) {
    return preferred;
  }

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isIOS) {
    const iosCandidates = ["audio/mp4", "audio/aac"];
    for (const t of iosCandidates) {
      if (supported(t)) return t as RecordingMime;
    }
  }

  const webmCandidates = ["audio/webm;codecs=opus", "audio/webm"];
  for (const t of webmCandidates) {
    if (supported(t)) return t as RecordingMime;
  }

  return "" as RecordingMime;
}

function toError(
  code: RecorderError["code"],
  cause?: unknown,
  message?: string
): RecorderError {
  return { code, cause, message };
}

export function createRecorder(opts: RecorderOptions = {}): Recorder {
  let mediaRecorder: MediaRecorder | null = null;
  let chunks: Blob[] = [];
  let startedAt = 0;
  let _state: RecorderState = "idle";
  // let visibilityHandlerAttached = false;

  const mime: RecordingMime = pickMime(opts.mime);

  function state(): RecorderState {
    return _state;
  }

  function fireError(e: RecorderError) {
    recorder.onerror?.(e);
  }

  function cleanupStream() {
    try {
      mediaRecorder?.stream.getTracks().forEach((t) => t.stop());
    } catch {
      /* noop */
    }
  }

  async function start(): Promise<void> {
    if (_state !== "idle") {
      const err = toError(
        "ALREADY_RUNNING",
        undefined,
        "Recorder already started"
      );
      fireError(err);
      throw err;
    }

    const constraints: MediaStreamConstraints = {
      audio: {
        channelCount: opts.channelCount ?? 1,
        noiseSuppression: opts.noiseSuppression ?? true,
        echoCancellation: opts.echoCancellation ?? true,
        autoGainControl: opts.autoGainControl ?? true,
        sampleRate: opts.sampleRate,
      },
    };

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (e: unknown) {
      if (e instanceof DOMException) {
        if (e.name === "NotAllowedError" || e.name === "SecurityError") {
          const err = toError(
            "PERMISSION_DENIED",
            e,
            "Microphone permission denied"
          );
          fireError(err);
          throw err;
        }
        if (e.name === "NotFoundError" || e.name === "OverconstrainedError") {
          const err = toError(
            "DEVICE_NOT_FOUND",
            e,
            "No suitable audio input device found"
          );
          fireError(err);
          throw err;
        }
      }
      const err = toError("UNKNOWN", e, "Failed to getUserMedia");
      fireError(err);
      throw err;
    }

    try {
      mediaRecorder = new MediaRecorder(stream, { mimeType: mime });
    } catch (e: unknown) {
      cleanupStream();
      const err = toError(
        "TYPE_UNSUPPORTED",
        e,
        `MediaRecorder type not supported: ${mime}`
      );
      fireError(err);
      throw err;
    }

    chunks = [];
    startedAt = performance.now();

    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
        recorder.ondata?.(e.data);
      }
    };

    mediaRecorder.onerror = (evt: ErrorEvent) => {
      const err = toError("UNKNOWN", evt.error, "MediaRecorder error");
      fireError(err);
    };

    // TODO: 탭 숨김 시 자동 일시정지 추가
    // if (opts.autoPauseOnHidden && !visibilityHandlerAttached) {
    //   const onVis = () => {
    //     if (document.hidden && _state === "recording") {
    //       pause();
    //     }
    //   };
    //   document.addEventListener("visibilitychange", onVis);
    //   visibilityHandlerAttached = true;

    //   const prevStop = stop;
    //   stop = async function stopWithDetach(): Promise<RecordingBlob> {
    //     document.removeEventListener("visibilitychange", onVis);
    //     visibilityHandlerAttached = false;
    //     return prevStop();
    //   };
    // }

    const slice = Number.isFinite(opts.timesliceMs) ? opts.timesliceMs! : 0;
    mediaRecorder.start(slice > 0 ? slice : undefined);
    _state = "recording";
  }

  async function stop(): Promise<RecordingBlob> {
    if (!mediaRecorder) {
      const err = toError("NOT_STARTED", undefined, "Recorder not started");
      fireError(err);
      throw err;
    }

    await new Promise<void>((resolve) => {
      const mr = mediaRecorder!;
      const finish = () => {
        mr.onstop = null;
        resolve();
      };

      if (mr.state === "inactive") return finish();
      mr.onstop = finish;
      try {
        mr.stop();
      } catch {
        finish();
      }
    });

    const rawBlob = new Blob(chunks, { type: mime });
    const durationMs = Math.max(0, performance.now() - startedAt);

    // 🔥 여기서 duration 메타데이터를 패치해준다
    let fixedBlob: Blob = rawBlob;
    try {
      fixedBlob = await fixWebmDuration(rawBlob, durationMs);
    } catch (e) {
      console.warn("[recorder] fixWebmDuration failed, using raw blob", e);
    }

    cleanupStream();
    mediaRecorder = null;
    _state = "idle";

    return { blob: fixedBlob, mime, durationMs };
  }

  function pause() {
    if (_state !== "recording") return;
    try {
      mediaRecorder?.pause();
      _state = "paused";
    } catch (e: unknown) {
      fireError(toError("UNKNOWN", e, "Pause failed"));
    }
  }

  function resume() {
    if (_state !== "paused") return;
    try {
      mediaRecorder?.resume();
      _state = "recording";
    } catch (e: unknown) {
      fireError(toError("UNKNOWN", e, "Resume failed"));
    }
  }

  const recorder: Recorder = {
    start,
    stop,
    pause,
    resume,
    state,
    ondata: undefined,
    onerror: undefined,
  };
  return recorder;
}
