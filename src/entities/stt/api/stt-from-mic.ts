import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";

import { requestAzureToken } from "./request-azure-token";

export async function sttFromMic(lang = "ko-KR") {
  const { authToken, region } = await requestAzureToken();

  const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
    authToken,
    region
  );
  speechConfig.speechRecognitionLanguage = lang;

  const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

  return new Promise<string>((resolve, reject) => {
    recognizer.recognizeOnceAsync(
      (result) => {
        if (result.reason === speechsdk.ResultReason.RecognizedSpeech) {
          resolve(result.text);
        } else {
          reject(new Error(result.errorDetails));
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

