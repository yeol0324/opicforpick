import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import { getAzureSpeechToken } from "./getToken";
import { convertWebmBlobToWav } from "@shared/lib/audio/convertWebmBlobToWav";

export async function recognizeFromBlob(
  blob: Blob,
  lang: string = "en-US"
): Promise<string> {
  const { authToken, region } = await getAzureSpeechToken();

  const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
    authToken,
    region
  );
  speechConfig.speechRecognitionLanguage = lang;

  const wavBlob = await convertWebmBlobToWav(blob);
  const wavFile = new File([wavBlob], "audio.wav", { type: "audio/wav" });

  const audioConfig = speechsdk.AudioConfig.fromWavFileInput(wavFile);
  const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

  return new Promise<string>((resolve, reject) => {
    recognizer.recognizeOnceAsync(
      (result) => {
        if (result.reason === speechsdk.ResultReason.RecognizedSpeech) {
          resolve(result.text);
        } else {
          reject(
            new Error(
              `STT failed. reason=${result.reason}, error=${result.errorDetails}`
            )
          );
        }
        recognizer.close();
      },
      (err) => {
        recognizer.close();
        reject(err);
      }
    );
  });
}
