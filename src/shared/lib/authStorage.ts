const GUEST_FLAG_KEY = "ofp_guest";

export function markGuest() {
  if (typeof window === "undefined") return;
  localStorage.setItem(GUEST_FLAG_KEY, "1");
}

export function clearGuest() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GUEST_FLAG_KEY);
}

export function isGuestMarked(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(GUEST_FLAG_KEY) === "1";
}
