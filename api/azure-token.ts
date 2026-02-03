import type { VercelRequest, VercelResponse } from '@vercel/node';

const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY!;
const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const tokenResponse = await fetch(
    `https://${AZURE_SPEECH_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
    {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY,
      },
    },
  );

  const authToken = await tokenResponse.text();
  if (!tokenResponse.ok) {
    return res
      .status(500)
      .json({ error: 'Token fetch failed', detail: authToken });
  }

  res.status(200).json({ authToken, region: AZURE_SPEECH_REGION });
}
