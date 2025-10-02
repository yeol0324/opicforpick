export type Player = {
  load(src: string | Blob): Promise<void>;
  play(): void;
  pause(): void;
  seek(s: number): void; // seconds
  setRate(r: number): void;
  duration(): number;
  currentTime(): number;
  onended?: () => void;
};

export function createPlayer(audioEl: HTMLAudioElement): Player {
  const player: Player = {
    async load(src: string | Blob) {
      audioEl.src = typeof src === "string" ? src : URL.createObjectURL(src);
      audioEl.load();
    },
    play: () => {
      void audioEl.play();
    },
    pause: () => audioEl.pause(),
    seek: (s) => {
      audioEl.currentTime = s;
    },
    setRate: (r) => {
      audioEl.playbackRate = r;
    },
    duration: () => audioEl.duration || 0,
    currentTime: () => audioEl.currentTime || 0,
    onended: undefined,
  };

  audioEl.onended = () => {
    if (player) player.onended?.();
  };

  function load(src: string | Blob) {
    audioEl.src = typeof src === "string" ? src : URL.createObjectURL(src);
    return (audioEl.load(), Promise.resolve());
  }
  return {
    load,
    play: () => audioEl.play(),
    pause: () => audioEl.pause(),
    seek: (s) => (audioEl.currentTime = s),
    setRate: (r) => (audioEl.playbackRate = r),
    duration: () => audioEl.duration ?? 0,
    currentTime: () => audioEl.currentTime ?? 0,
    onended: undefined,
  };
}
