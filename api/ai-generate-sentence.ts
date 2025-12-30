import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("[ai-generate-sentence] GEMINI_API_KEY is not set");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { level, topic } = req.body as {
    topic: string;
    level?: string;
  };
  console.log(level);

  if (!genAI) {
    return res.status(500).json({ error: "Gemini client not initialized" });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
    You are a content generator for an English speaking practice platform.

Given a topic parameter: "${topic}", generate a complete OPIC-style speaking set.

Follow these rules strictly:

1. Generate exactly ONE question related to the topic.
   - The question must be natural, commonly used in OPIC-style exams.
   - The question must be suitable for intermediate-level learners.

2. Generate a coherent spoken answer to the question.
   - The answer should sound natural and conversational.
   - Length: about 10–14 sentences total (including short reactions).
   - Avoid overly formal or written language.
   - Do NOT include bullet points or lists in the content itself.

3. Split the content into individual sentences.
   - Each sentence must be a complete spoken sentence.
   - Do NOT merge multiple ideas into one sentence.
   - Short reaction sentences (e.g., “That’s a good question.”) are allowed.

4. Provide BOTH English and Korean for every sentence.
   - The Korean translation must be natural and fluent.
   - Do NOT translate word-for-word if it sounds unnatural in Korean.

5. Assign a position number starting from 1.
   - position 1 MUST be the question.
   - position 2 and onward are answer sentences in order.

6. Output ONLY valid JSON.
   - No explanations.
   - No markdown.
   - No comments.
   - No extra text.

7. Use the following JSON schema EXACTLY:

{
  "topic": "${topic}",
  "sentences": [
    {
      "position": 1,
      "type": 2,
      "eng": "Question sentence in English",
      "kor": "Question sentence in Korean"
    },
    {
      "position": 2,
      "type": 2,
      "eng": "Answer sentence in English",
      "kor": "Answer sentence in Korean"
    }
  ]
}

8. The first sentence (position 1) MUST have type = 1.
9. All other sentences (position 2 and onward) MUST have type = 2.
10. Do not include IDs, timestamps, or database-related fields.
`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
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
    } catch (error) {
      console.error("[ai-generate-sentence] JSON parse error : ", text);
      console.error("[ai-generate-sentence] error : ", error);
      return res.status(500).json({
        error: "Gemini did not return valid JSON",
        raw: text,
      });
    }

    return res.status(200).json({
      result: { ...parsed },
    });
  } catch (error) {
    // TODO: 503 ai 과부하 처리 추가
    console.error(
      "[ai-generate-sentence] error raw",
      JSON.stringify(error, null, 2)
    );
    return res.status(500).json({ error: "AI feedback failed" });
  }
}
