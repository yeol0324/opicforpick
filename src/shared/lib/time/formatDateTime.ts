/**
 * yyyy-mm-dd HH:mm format functions
 * @param string "2025-11-10T03:50:50.819332+00:00"
 * @returns "2025-11-10 12:50" (KST 기준, example)
 */
export function YYYYMMDDHHmm(raw: string): string {
  const safe = raw.replace(
    /(\.\d+)(\+|\-)/,
    (_m, frac, sign) => frac.slice(0, 4) + sign
  );

  const date = new Date(safe);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
