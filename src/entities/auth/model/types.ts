import type { User } from "@supabase/supabase-js";

export type AuthMode = "none" | "guest" | "member";

export type AuthState =
  | { mode: "none"; user: null; deviceId: null }
  | { mode: "guest"; user: null; deviceId: string }
  | { mode: "member"; user: User; deviceId: null };
