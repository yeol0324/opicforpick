import { GoogleGenerativeAI } from '@google/generative-ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

import { GEMINI_MODEL } from '@shared/lib';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('[ai-generate-sentence] GEMINI_API_KEY is not set');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { level, topic } = req.body as {
    topic: string;
    level?: string;
  };
  console.log(level);

  if (!genAI) {
    return res.status(500).json({ error: 'Gemini client not initialized' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
    });

    const prompt = `
    You are a content generator for an English speaking practice platform.

Given a topic parameter: "${topic}", generate a complete OPIC-style speaking set.

Follow these rules strictly:

0. Generate a short, natural English TITLE that summarizes the situation.
   - Make the title vary each time even for the same topic.
   - Choose ONE angle randomly from: memory, problem-solving, comparison, advice, unexpected event, preference shift, habit change.
   - Avoid generic titles like "Describing Your Daily Routine".
   - Internally brainstorm 3 distinct title candidates, then output only the best one.
   - Candidates must be meaningfully different.
   - Output only the chosen title.
   
1. Generate exactly ONE question related to the topic.
   - The question must be natural, commonly used in OPIC-style exams.
   - The question must be suitable for intermediate-level learners.

2. Generate a coherent spoken answer to the question.
   - The answer should sound natural and conversational.
   - Length: about 8–12 sentences total (including short reactions).
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
  "title": "Short English title here",
  "topic": "${topic}",
  "sentences": [
    {
      "position": 1,
      "type": 1,
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

8. The first sentence (Question sentence, position 1) MUST have type = 1.
9. All other sentences (position 2 and onward) MUST have type = 2.
10. Do not include IDs, timestamps, or database-related fields.
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
      console.error('[ai-generate-sentence] JSON parse error : ', text);
      console.error('[ai-generate-sentence] error : ', error);
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

    console.error('[ai-generate-sentence] error', {
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
