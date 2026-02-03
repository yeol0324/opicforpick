import { fixWebmDuration } from '@fix-webm-duration/fix';

import type {
  Recorder,
  RecorderOptions,
  RecordingBlob,
  RecordingMime,
  RecorderError,
  RecorderState,
} from './audio.type';

function pickMime(preferred?: RecordingMime): RecordingMime {
  const supported = (t: string) =>
    typeof MediaRecorder !== 'undefined' &&
    typeof MediaRecorder.isTypeSupported === 'function' &&
    MediaRecorder.isTypeSupported(t);

  if (preferred && supported(preferred)) {
    return preferred;
  }

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isIOS) {
    const iosCandidateList = ['audio/mp4', 'audio/aac'];
    for (const t of iosCandidateList) {
      if (supported(t)) return t as RecordingMime;
    }
  }

  const webmCandidateList = ['audio/webm;codecs=opus', 'audio/webm'];
  for (const t of webmCandidateList) {
    if (supported(t)) return t as RecordingMime;
  }

  return '' as RecordingMime;
}

function toError(
  code: RecorderError['code'],
  cause?: unknown,
  message?: string,
): RecorderError {
  return { code, cause, message };
}

export function createRecorder(opts: RecorderOptions = {}): Recorder {
  let mediaRecorder: MediaRecorder | null = null;
  let stream: MediaStream | null = null;
  let chunks: Blob[] = [];
  let startedAt = 0;
  let _state: RecorderState = 'idle';
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
      stream?.getTracks().forEach((t) => t.stop());
    } catch {
      /* noop */
    } finally {
      stream = null;
    }
  }

  function resetRecordingBuffer() {
    chunks = [];
    startedAt = 0;
  }

  async function start(): Promise<void> {
    if (_state !== 'idle') {
      const err = toError(
        'ALREADY_RUNNING',
        undefined,
        'Recorder already started',
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

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (e: unknown) {
      stream = null;
      if (e instanceof DOMException) {
        if (e.name === 'NotAllowedError' || e.name === 'SecurityError') {
          const err = toError(
            'PERMISSION_DENIED',
            e,
            'Microphone permission denied',
          );
          fireError(err);
          throw err;
        }
        if (e.name === 'NotFoundError' || e.name === 'OverconstrainedError') {
          const err = toError(
            'DEVICE_NOT_FOUND',
            e,
            'No suitable audio input device found',
          );
          fireError(err);
          throw err;
        }
      }
      const err = toError('UNKNOWN', e, 'Failed to getUserMedia');
      fireError(err);
      throw err;
    }

    try {
      mediaRecorder =
        mime && mime.length > 0
          ? new MediaRecorder(stream, { mimeType: mime })
          : new MediaRecorder(stream);
    } catch (e: unknown) {
      cleanupStream();
      const err = toError(
        'TYPE_UNSUPPORTED',
        e,
        `MediaRecorder type not supported: ${mime || '(default)'}`,
      );
      fireError(err);
      throw err;
    }

    resetRecordingBuffer();
    startedAt = performance.now();

    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
        recorder.ondata?.(e.data);
      }
    };

    mediaRecorder.onerror = (evt: ErrorEvent) => {
      const err = toError('UNKNOWN', evt.error, 'MediaRecorder error');
      fireError(err);
    };

    const slice =
      Number.isFinite(opts.timesliceMs) &&
      opts.timesliceMs &&
      opts.timesliceMs > 0
        ? opts.timesliceMs
        : undefined;

    mediaRecorder.start(slice);
    _state = 'recording';
  }

  async function stop(): Promise<RecordingBlob> {
    if (!mediaRecorder) {
      const err = toError('NOT_STARTED', undefined, 'Recorder not started');
      fireError(err);
      throw err;
    }

    const mr = mediaRecorder;

    await new Promise<void>((resolve) => {
      const finish = () => {
        mr.onstop = null;
        resolve();
      };

      if (mr.state === 'inactive') {
        finish();
        return;
      }

      mr.onstop = finish;
      try {
        mr.stop();
      } catch {
        finish();
      }
    });

    const rawBlob = new Blob(chunks, { type: mime || mr.mimeType });
    const durationMs = Math.max(0, performance.now() - startedAt);

    resetRecordingBuffer();

    let fixedBlob: Blob = rawBlob;
    try {
      fixedBlob = await fixWebmDuration(rawBlob, durationMs);
    } catch (e) {
      console.warn('[recorder] fixWebmDuration failed, using raw blob', e);
    }

    cleanupStream();
    mediaRecorder = null;
    _state = 'idle';

    return {
      blob: fixedBlob,
      mime: (mime || mr.mimeType) as RecordingMime,
      durationMs,
    };
  }

  function pause() {
    if (_state !== 'recording') return;
    try {
      mediaRecorder?.pause();
      _state = 'paused';
    } catch (e: unknown) {
      fireError(toError('UNKNOWN', e, 'Pause failed'));
    }
  }

  function resume() {
    if (_state !== 'paused') return;
    try {
      mediaRecorder?.resume();
      _state = 'recording';
    } catch (e: unknown) {
      fireError(toError('UNKNOWN', e, 'Resume failed'));
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
