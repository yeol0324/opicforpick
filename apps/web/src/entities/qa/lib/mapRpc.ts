import type { RpcRandomLine, RandomLine } from "../model/types";

export function mapRpcRandomLine(row: RpcRandomLine): RandomLine {
  return {
    id: row.line_id,
    seq: row.seq,
    ko: row.line_ko,
    en: row.line_en,
    questionId: row.question_id,
    qKo: row.question_ko,
    qEn: row.question_en,
  };
}
