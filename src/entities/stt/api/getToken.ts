export async function getAzureSpeechToken() {
  const res = await fetch("/api/azure-token");
  if (!res.ok) throw new Error("Token request failed");
  return res.json() as Promise<{ authToken: string; region: string }>;
}
