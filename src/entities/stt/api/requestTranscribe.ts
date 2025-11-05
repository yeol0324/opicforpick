/**
 * Blob to Base64
 * @param blob 녹음된 오디오 Blob 객체
 * @returns Base64 데이터 문자열 (헤더 제외)
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to read blob as string."));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function requestTranscribe(audioBlob: Blob): Promise<string> {
  if (!audioBlob) {
    throw new Error("Audio Blob is required for transcription.");
  }
  const audioBase64 = await blobToBase64(audioBlob);

  const response = await fetch("/api/azure-transcribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      audioBase64: audioBase64,
      mimeType: audioBlob.type,
    }),
  });

  if (!response.ok) {
    let errorDetail = `HTTP Error: ${response.status} ${response.statusText}`;
    try {
      const errorJson = await response.json();
      errorDetail += ` - ${errorJson.message || JSON.stringify(errorJson)}`;
    } catch (error) {
      console.log(error);
    }

    throw new Error(`Transcribe failed: ${errorDetail}`);
  }

  const data = await response.json();

  if (!data.transcript) {
    throw new Error("Transcribe succeeded but result is missing 'transcript'.");
  }

  return data.transcript as string;
}
