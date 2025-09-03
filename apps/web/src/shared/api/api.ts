export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export async function get<T>(url: string): Promise<T> {
  const res = await fetch(API_URL + url, { credentials: "include" });
  if (!res.ok) throw new Error(`GET ${url} ${res.status}`);
  return res.json();
}
