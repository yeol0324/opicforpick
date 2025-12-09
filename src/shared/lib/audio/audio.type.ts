export type RecordingMime = "audio/webm" | "audio/wav";

export type RecordingBlob = {
  blob: Blob;
  mime: RecordingMime;
  durationMs: number;
};

export type RecorderState = "idle" | "recording" | "paused";

export type RecorderErrorCode =
  | "PERMISSION_DENIED"
  | "DEVICE_NOT_FOUND"
  | "TYPE_UNSUPPORTED"
  | "ALREADY_RUNNING"
  | "NOT_STARTED"
  | "UNKNOWN";

export interface RecorderError {
  code: RecorderErrorCode;
  cause?: unknown;
  message?: string;
}

export interface RecorderOptions {
  mime?: RecordingMime;
  sampleRate?: number;
  channelCount?: number;
  timesliceMs?: number;
  autoGainControl?: boolean;
  echoCancellation?: boolean;
  noiseSuppression?: boolean;
  autoPauseOnHidden?: boolean;
}

export interface Recorder {
  start(): Promise<void>;
  stop(): Promise<RecordingBlob>;
  pause(): void;
  resume(): void;
  state(): RecorderState;

  ondata?: (chunk: Blob) => void;
  onerror?: (e: RecorderError) => void;
}
