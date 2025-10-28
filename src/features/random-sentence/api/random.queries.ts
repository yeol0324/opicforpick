import { queryOptions } from "@tanstack/react-query";
import { sentenceQueries } from "@entities/sentence/api";
import type { SentenceType } from "@entities/sentence/model/types";

/**
 * FSD 패턴 준수: features는 entities의 API를 재사용합니다.
 * entities/sentence/api의 random 쿼리를 사용합니다.
 */
export const randomSentenceQuery = (sentenceType?: SentenceType) =>
  sentenceQueries.random(sentenceType);
