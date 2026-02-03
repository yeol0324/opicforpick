import type { VercelRequest, VercelResponse } from '@vercel/node';

const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION;

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
    return res
      .status(500)
      .json({ message: 'Server configuration error: Azure keys missing.' });
  }

  /** Blob -> Base64 incording */
  const { audioBase64 } = req.body;

  if (!audioBase64) {
    return res.status(400).json({ message: 'Missing audio data.' });
  }

  try {
    const tokenResponse = await fetch(
      `https://${AZURE_SPEECH_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY,
        },
      },
    );
    const token = await tokenResponse.text();

    if (!tokenResponse.ok) throw new Error('Token failed: ' + token);

    const audioBuffer = Buffer.from(audioBase64, 'base64');

    const azureSttResponse = await fetch(
      `https://${AZURE_SPEECH_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'audio/webm',
          'Content-Length': audioBuffer.length.toString(),
        },
        body: audioBuffer,
      },
    );

    const azureResult = await azureSttResponse.json();
    if (!azureSttResponse.ok)
      throw new Error('STT failed: ' + JSON.stringify(azureResult));

    const transcript = azureResult;

    res.status(200).json({ transcript, success: true });
  } catch (error) {
    console.error('Azure STT Error:', error);
    res.status(500).json({ message: 'Speech to Text processing failed.' });
  }
}
