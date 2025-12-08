import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("[ai-feedback] GEMINI_API_KEY is not set");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { question, level, audioBase64, mimeType } = req.body as {
    question: string;
    level?: string;
    audioBase64?: string;
    mimeType?: string;
  };

  if (!audioBase64 || !mimeType) {
    return res.status(400).json({ error: "Missing audio" });
  }

  if (!genAI) {
    return res.status(500).json({ error: "Gemini client not initialized" });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an English-speaking coach specializing in OPIC-style speaking tests.

You will receive:
- The original question (in English).
- An audio answer from the learner (in English).
Evaluate the learner’s English answer based on the following information:

[Input Information]
- Question:
${question}

- Learner Level:
${level}

[Your Tasks]
1. Pronunciation
   - Listen to your voice audio (in English) and evaluate your pronunciation.
   
2. Grammar / Sentence Structure
   - Evaluate tense usage, articles, prepositions, word order, sentence length, and overall structure.
   - Point out both strengths and areas to improve.

3. Vocabulary / Expression Choice
   - Suggest more natural or appropriate expressions.
   - Highlight awkward word choices or collocation issues.

4. Content Relevance
   - Evaluate how well the answer addresses the question.
   - Mention missing details or additional points that could strengthen the response.

5. Topic-related Vocabulary Practice
   - Based on the question topic and learner level, provide 5 useful words or expressions.
   - These should be suitable for OPIC-style speaking answers.
   - For recommended vocabulary, provide only:
     - a natural English word or expression
     - a concise Korean meaning (noun/verb phrase only)
   - Do NOT include explanations, comparisons, parentheses, or meta comments.



[Output Format]
You MUST respond **only** with valid JSON in the following format.
Write explanations in Korean, but keep English examples or expressions exactly as they are.

{
  "pronunciationComment": "string, overall feedback on pronunciation",
  "grammarComment": "string, evaluation of grammar and sentence structure",
  "vocabularyComment": "string, feedback on word/phrase choice",
  "contentComment": "string, feedback on how well the answer addresses the question",
  "overallComment": "string, final summary and recommended next steps",
  "pronunciationScore": 0-100,
  "grammarScore": 0-100,
  "vocabularyScore": 0-100,
  "contentScore": 0-100,
  "recommendVoca": [
    {
      "expression": "string (English word or phrase only)",
      "meaning": "string (Korean meaning only, no explanation, no parentheses)"
    }
  ]
]
}

Important:
- You MUST return valid JSON only.
- Do NOT include any text outside the JSON block (no markdown, no explanations).
`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: audioBase64,
                mimeType: mimeType,
              },
            },
          ],
        },
      ],
    });

    const response = result.response;

    let text = response.text();

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
      result: { ...parsed },
    });
  } catch (e: any) {
    // TODO: 503 ai 과부하 처리 추가
    console.error("[ai-feedback] error raw", JSON.stringify(e, null, 2));
    return res.status(500).json({ error: "AI feedback failed" });
  }
}
