import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("[ai-feedback] GEMINI_API_KEY is not set");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("[ai-feedback] called =====================");
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { question, transcript, level } = req.body as {
    question: string;
    transcript: string;
    level: string;
  };
  console.log("[ai-feedback] transcript =====================", transcript);

  if (!transcript) {
    return res.status(400).json({ error: "Missing transcript" });
  }

  if (!genAI) {
    return res.status(500).json({ error: "Gemini client not initialized" });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
    You are an English-speaking coach specializing in OPIC-style speaking tests.

Evaluate the learner’s English answer based on the following information:

[Input Information]
- Question:
${question}

- Learner’s Answer (Transcript):
${transcript}

- Learner Level:
${level}

[Your Tasks]
1. Pronunciation
   - Since you only have the STT-generated transcript (not the actual audio), estimate pronunciation issues based on textual clues.
   - Do NOT be overly certain. Give gentle advice such as “There may have been pronunciation issues with...” or “This part might sound unclear.”

2. Grammar / Sentence Structure
   - Evaluate tense usage, articles, prepositions, word order, sentence length, and overall structure.
   - Point out both strengths and areas to improve.

3. Vocabulary / Expression Choice
   - Suggest more natural or appropriate expressions.
   - Highlight awkward word choices or collocation issues.

4. Content Relevance
   - Evaluate how well the answer addresses the question.
   - Mention missing details or additional points that could strengthen the response.

[Output Format]
You MUST respond **only** with valid JSON in the following format.
Write explanations in Korean, but keep English examples or expressions exactly as they are.

{
  "pronunciationComment": "string, overall feedback on pronunciation",
  "grammarComment": "string, evaluation of grammar and sentence structure",
  "vocabularyComment": "string, feedback on word/phrase choice",
  "contentComment": "string, feedback on how well the answer addresses the question",
  "overallComment": "string, final summary and recommended next steps",
  "pronunciationScore": 0-100 (optional),
  "grammarScore": 0-100 (optional),
  "vocabularyScore": 0-100 (optional),
  "contentScore": 0-100 (optional)
}

Important:
- You MUST return valid JSON only.
- Do NOT include any text outside the JSON block (no markdown, no explanations).
`;

    const result = await model.generateContent(prompt);
    const response = result.response;

    let text = response.text();
    console.log("[ai-feedback] response:::", text);

    if (text.startsWith("```")) {
      text = text.replace(/^```(?:json)?\s*/i, "");
      text = text.replace(/```$/, "").trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("[ai-feedback] JSON parse error", text);
      return res.status(500).json({
        error: "Gemini did not return valid JSON",
        raw: text,
      });
    }

    return res.status(200).json({
      ...parsed,
      transcript,
    });
  } catch (e) {
    // TODO: 503 ai 과부하 처리 추가
    console.error("[ai-feedback] error", e);
    return res.status(500).json({ error: "AI feedback failed" });
  }
}
