/** DB RPC raw */
export type RpcRandomLine = {
  line_id: number;
  seq: number;
  line_ko: string;
  line_en: string;
  question_id: number;
  question_ko: string;
  question_en: string;
};

/** Domain model */
export type RandomLine = {
  id: number;
  seq: number;
  ko: string;
  en: string;
  questionId: number;
  qKo: string;
  qEn: string;
};
