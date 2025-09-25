import type { PostgrestError } from "@supabase/supabase-js";

export class SupabaseError extends Error {
  status?: number;
  code?: string;
  constructor(error: PostgrestError) {
    super(error.message);
    this.name = "SupabaseError";
    // this.status = error.status;
    this.code = error.code;
  }
}

export function unwrap<T>(res: {
  data: T | null;
  error: PostgrestError | null;
}): T {
  if (res.error) {
    throw new SupabaseError(res.error);
  }
  if (res.data === null) {
    throw new Error("No data returned from Supabase");
  }
  return res.data;
}
