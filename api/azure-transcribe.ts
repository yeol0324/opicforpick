import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION;

export default async function (req: VercelRequest, res: VercelResponse) {
  console.log("[azure-transcribe] called");

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
    return res
      .status(500)
      .json({ message: "Server configuration error: Azure keys missing." });
  }

  /** Blob -> Base64 incording */
  const { audioBase64 } = req.body;

  if (!audioBase64) {
    return res.status(400).json({ message: "Missing audio data." });
  }

  try {
    console.log("[azure-transcribe] get-token start");

    const tokenResponse = await fetch(
      `https://${AZURE_SPEECH_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": AZURE_SPEECH_KEY,
        },
      }
    );
    const token = await tokenResponse.text();

    console.log("[azure-transcribe] tokenResponse", tokenResponse);
    if (!tokenResponse.ok) throw new Error("Token failed: " + token);

    const audioBuffer = Buffer.from(audioBase64, "base64");

    const azureSttResponse = await fetch(
      `https://${AZURE_SPEECH_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=ko-KR`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "audio/webm",
          "Content-Length": audioBuffer.length.toString(),
        },
        body: audioBuffer,
      }
    );
    console.log("[azure-transcribe] azureSttResponse", azureSttResponse);

    const azureResult = await azureSttResponse.json();
    if (!azureSttResponse.ok)
      throw new Error("STT failed: " + JSON.stringify(azureResult));

    const transcript = azureResult;

    res.status(200).json({ transcript, success: true });
  } catch (error) {
    console.error("Azure STT Error:", error);
    res.status(500).json({ message: "Speech to Text processing failed." });
  }
}
