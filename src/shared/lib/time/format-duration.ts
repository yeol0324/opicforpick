export function formatMmSs(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const mm = Math.floor(total / 60);
  const ss = total % 60;
  const m = String(mm).padStart(2, '0');
  const s = String(ss).padStart(2, '0');
  return `${m}m ${s}s`;
}
