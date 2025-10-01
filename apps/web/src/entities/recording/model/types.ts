export type Recording = {
  id: string;
  userId: string;
  themeId?: number | null;
  url: string;
  durationMs: number;
  createdAt: string;
};
