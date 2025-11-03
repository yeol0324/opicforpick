import type { User } from "@supabase/supabase-js";

export type AuthState =
  | { mode: "none"; user: null }
  | { mode: "member"; user: User };
