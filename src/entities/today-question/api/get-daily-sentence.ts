import { supabase } from "@shared/api/supabase-client";
import type { Sentence } from "@entities/sentence/model/types";
import type { Level } from "../model/types";

/**
 * API 응답 등 다양한 형태의 데이터를 표준 Sentence 객체로 변환합니다.
 * 이 함수는 데이터의 일관성을 보장하여 앱의 안정성을 높입니다.
 * @param data - 변환할 원본 데이터 객체
 * @returns 표준화된 Sentence 객체 또는 null
 */
function mapToSentence(data: unknown): Sentence | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  // 필수 필드 검사
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
  level: Level = "Advanced"
): Promise<Sentence | null> {
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
