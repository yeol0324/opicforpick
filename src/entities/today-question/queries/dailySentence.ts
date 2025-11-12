import { supabase } from "@shared/api/supabase";
import { unwrap } from "@shared/api/supabase-helpers";
import type { Sentence } from "@entities/sentence/model/types";

export type Level = "Beginner" | "Intermediate" | "Advanced";

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

    console.log("[fetchDailySentence] Raw data:", data);
    console.log("[fetchDailySentence] Data type:", typeof data);
    console.log("[fetchDailySentence] Is array:", Array.isArray(data));
    console.log(
      "[fetchDailySentence] Data keys:",
      data && typeof data === "object" ? Object.keys(data) : "N/A"
    );

    if (data === null || data === undefined) {
      console.log("[fetchDailySentence] Data is null or undefined");
      return null;
    }

    if (Array.isArray(data)) {
      console.log("[fetchDailySentence] Array length:", data.length);
      if (data.length === 0) {
        console.log("[fetchDailySentence] Empty array");
        return null;
      }
      const result = data[0];
      console.log("[fetchDailySentence] First item from array:", result);
      if (result === null || result === undefined) {
        console.log("[fetchDailySentence] First item is null or undefined");
        return null;
      }
      return result as Sentence;
    }

    if (data && typeof data === "object" && !Array.isArray(data)) {
      console.log("[fetchDailySentence] Single object:", data);
      if (Object.keys(data).length === 0) {
        console.log("[fetchDailySentence] Empty object");
        return null;
      }
      return data as Sentence;
    }

    console.warn("[fetchDailySentence] Unexpected data format:", data);
    return null;
  } catch (error) {
    console.error("[fetchDailySentence] Exception:", error);
    throw error;
  }
}
