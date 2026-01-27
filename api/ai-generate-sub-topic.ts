import { GoogleGenerativeAI } from '@google/generative-ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const apiKey = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';

if (!apiKey) {
  console.warn('[ai-generate-sub-topic] GEMINI_API_KEY is not set');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Gemini API를 사용해 OPIC 영어 문장 subTopic 리스트를 생성하는 Vercel Serverless API
 *
 * 요청 body로 전달받은 topic(topic_slug)을 기반으로
 * 질문을 다양하게 생성할 수 있도록 subTopic 10개를 추천합니다.
 *
 * - 10개의 subTopic을 생성합니다.
 * - subTopic은 snake_case의 짧은 문자열로만 구성됩니다.
 *
 * @param {VercelRequest} req - Vercel Serverless Function Request
 * @param {VercelResponse} res - Vercel Serverless Function Response
 *
 * @returns {Promise<void>} HTTP Response로 결과를 반환합니다.
 * - 200: 정상 생성 성공
 * - 400: topic 누락 (topic is undefined)
 * - 405: POST가 아닌 요청
 * - 500: Gemini 초기화 실패 / JSON 파싱 실패 / 기타 서버 오류
 * - 503: Gemini 서비스 일시 오류 (가능한 경우)
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { topic, level } = req.body as {
    topic: string;
    level?: string;
  };

  // ✅ level 기본값 intermediate
  const fixedLevel = level ?? 'intermediate';

  if (!topic) {
    return res.status(400).json({ error: 'topic is undefined' });
  }

  if (!genAI) {
    return res.status(500).json({ error: 'Gemini client not initialized' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
    });

    const prompt = `
    You are a subtopic recommender for an OPIC-style English speaking practice platform.

    INPUT:
    - topic_slug: "${topic}"
    - level: "${fixedLevel}"

    GOAL:
    Recommend diverse subtopics for the given topic slug so that generated OPIC questions are varied and not repetitive.

    RULES (follow strictly):
    1) Output ONLY valid JSON. No markdown, no explanations, no extra text.
    2) Recommend exactly 10 subtopics.
    3) Each subtopic must be short, in snake_case.
    4) Subtopics must be diverse and cover multiple angles:
      - experience / memory
      - problem & solution
      - comparison
      - preference
      - unexpected event
      - habit change
      - advice/tips
      - planning/future
    5) Subtopics must be appropriate for the given level: "${fixedLevel}".

    OUTPUT JSON SCHEMA (exactly):
    {
      "topic": "${topic}",
      "level": "${fixedLevel}",
      "subtopics": [
        "subtopic_1",
        "subtopic_2",
        "subtopic_3",
        "subtopic_4",
        "subtopic_5",
        "subtopic_6",
        "subtopic_7",
        "subtopic_8",
        "subtopic_9",
        "subtopic_10"
      ]
    }
    `;

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 1.0,
        topP: 0.95,
        topK: 40,
      },
    });

    const response = result.response;

    let text = response.text();

    if (text.startsWith('```')) {
      text = text.replace(/^```(?:json)?\s*/i, '');
      text = text.replace(/```$/, '').trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      console.error('[ai-generate-sub-topic] JSON parse error : ', text);
      console.error('[ai-generate-sub-topic] error : ', error);
      return res.status(500).json({
        error: 'Gemini did not return valid JSON',
        raw: text,
      });
    }

    return res.status(200).json({
      result: { ...parsed },
    });
  } catch (error) {
    const err = error as unknown as {
      message?: string;
      status?: number;
      statusText?: string;
      response?: unknown;
      cause?: unknown;
    };

    console.error('[ai-generate-sub-topic] error', {
      message: err?.message,
      status: err?.status,
      statusText: err?.statusText,
      response: err?.response,
      cause: err?.cause,
    });

    const status = typeof err?.status === 'number' ? err.status : 500;

    return res.status(status === 503 ? 503 : 500).json({
      error: err?.message ?? 'Unknown error',
      status: err?.status ?? null,
      statusText: err?.statusText ?? null,
    });
  }
}
