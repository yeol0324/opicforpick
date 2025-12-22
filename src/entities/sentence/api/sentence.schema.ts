import { z } from "zod";
import type { SentenceType } from "@entities/sentence/model/sentence.type";
import type { ProficiencyLevel } from "@shared/lib";

const ProficiencyLevelSchema = z.enum(["Beginner", "Intermediate", "Advanced"]);

const SentenceRpcSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  created_at: z.string(),

  // DB 표준 필드
  sentence_eng: z.string().min(1),
  sentence_kor: z.string().optional().default(""),

  type: z.number().int().nonnegative().default(0),
  level: ProficiencyLevelSchema.default("Beginner"),
  theme_id: z.number().int().nonnegative().default(0),
});

// 만약 과거/다른 API에서 오는 별칭들을 정말 받아줘야 한다면
const SentenceRpcWithAliasesSchema = z
  .object({
    id: z.union([z.string(), z.number()]).transform(String),
    created_at: z.string(),

    sentence_eng: z.string().optional(),
    sentenceEng: z.string().optional(),
    text: z.string().optional(),
    content: z.string().optional(),

    sentence_kor: z.string().optional(),
    type: z.number().int().nonnegative().optional(),
    level: ProficiencyLevelSchema.optional(),
    theme_id: z.number().int().nonnegative().optional(),
  })
  .transform((v) => {
    const sentence_eng =
      v.sentence_eng ?? v.sentenceEng ?? v.text ?? v.content ?? "";

    // 여기서 "빈 문자열이면 실패"로 강제
    if (!sentence_eng.trim()) {
      throw new Error("Invalid sentence: sentence_eng is empty");
    }

    const normalized = {
      id: v.id,
      created_at: v.created_at,
      sentence_eng,
      sentence_kor: v.sentence_kor ?? "",
      type: v.type ?? 0,
      level: v.level ?? "Beginner",
      theme_id: v.theme_id ?? 0,
    } satisfies SentenceType;

    return normalized;
  });

type SentenceRpcType = z.infer<typeof SentenceRpcSchema>;
