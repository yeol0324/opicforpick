export type Sentence = {
  id: number;
  text: string;
  text_en: string;
  note?: string | null;
  source?: string | null;
  created_at: string;
  user_id: string;
};
