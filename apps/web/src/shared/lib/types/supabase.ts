export type Sentence = {
  id: number;
  text: string;
  note?: string | null;
  source?: string | null;
  created_at: string;
  user_id: string;
};

export type AuthUserMeta = {
  nickname?: string;
};
