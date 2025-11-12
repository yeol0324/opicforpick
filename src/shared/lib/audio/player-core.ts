export type Player = {
  load(src: string | Blob): Promise<void>;
  play(): void;
  pause(): void;
  seek(seconds: number): void;
  setRate(rate: number): void;
  duration(): number;
  currentTime(): number;
  onended?: () => void;
};

export function createPlayer(audioElement: HTMLAudioElement): Player {
  const player: Player = {
    async load(src: string | Blob) {
      audioElement.src =
        typeof src === "string" ? src : URL.createObjectURL(src);
      audioElement.load();
    },
    play() {
      void audioElement.play();
    },
    pause() {
      audioElement.pause();
    },
    seek(seconds: number) {
      audioElement.currentTime = seconds;
    },
    setRate(rate: number) {
      audioElement.playbackRate = rate;
    },
    duration() {
      return audioElement.duration ?? 0;
    },
    currentTime() {
      return audioElement.currentTime ?? 0;
    },
    onended: undefined,
  };

  audioElement.onended = () => {
    player.onended?.();
  };

  return player;
}
