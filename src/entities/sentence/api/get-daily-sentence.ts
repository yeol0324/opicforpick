import type { SentenceRow } from "@entities/sentence/model/sentence.type";

import { supabase } from "@shared/api/supabase-client";
import type { ProficiencyLevel } from "@shared/lib";

/**
 * Normalize raw sentence data into a standardized SentenceRow.
 *
 * Converts an unknown input into a SentenceRow when required identifiers are present.
 * Accepts multiple source field variants for English text (`sentence_eng`, `sentenceEng`, `text`, `content`)
 * and uses `sentence_kor` for Korean text. Numeric and string fields are coerced or defaulted when missing.
 *
 * @param data - Raw source object to convert; must include `id` and `created_at`. May include `sentence_eng`/`sentenceEng`/`text`/`content`, `sentence_kor`, `type`, `level`, and `theme_id`.
 * @returns A SentenceRow with normalized properties if `id` and `created_at` exist; `null` otherwise. Defaults: `sentence_eng` and `sentence_kor` to `""`, `type` and `theme_id` to `0`, and `level` to `"Beginner"`.
 */
function mapToSentence(data: unknown): SentenceRow | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  if (!("id" in data) || !("created_at" in data)) {
    console.error(
      "Invalid sentence data: 'id' or 'created_at' is missing.",
      data
    );
    return null;
  }

  const sentenceEng =
    ("sentence_eng" in data && String(data.sentence_eng)) ||
    ("sentenceEng" in data && String(data.sentenceEng)) ||
    ("text" in data && String(data.text)) ||
    ("content" in data && String(data.content)) ||
    "";

  const sentenceKor =
    ("sentence_kor" in data && String(data.sentence_kor)) || "";

  return {
    id: String(data.id),
    created_at: String(data.created_at),
    sentence_eng: sentenceEng,
    sentence_kor: sentenceKor,
    type: "type" in data && typeof data.type === "number" ? data.type : 0,
    level:
      "level" in data && typeof data.level === "string"
        ? data.level
        : "Beginner",
    theme_id:
      "theme_id" in data && typeof data.theme_id === "number"
        ? data.theme_id
        : 0,
  };
}

/**
 * 오늘의 문장
 * Supabase RPC 함수 get_daily_sentence 사용
 */
export async function fetchDailySentence(
  level: ProficiencyLevel = "Advanced"
): Promise<SentenceRow | null> {
  try {
    const { data, error } = await supabase.rpc("get_daily_sentence", {
      level_input: level,
    });

    if (error) {
      console.error("[fetchDailySentence] RPC Error:", error);
      throw error;
    }

    if (!data) {
      return null;
    }

    // 데이터가 배열일 경우 첫 번째 항목을, 객체일 경우 해당 객체를 매핑
    const rawSentence = Array.isArray(data) ? data[0] : data;

    return mapToSentence(rawSentence);
  } catch (error) {
    console.error("[fetchDailySentence] Exception:", error);
    throw error;
  }
}