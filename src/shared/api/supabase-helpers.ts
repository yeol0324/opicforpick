import type {
  PostgrestError,
  PostgrestSingleResponse,
} from '@supabase/supabase-js';
export class SupabaseError extends Error {
  status?: number;
  code?: string;

  constructor(error: PostgrestError) {
    super(error.message);
    this.name = 'SupabaseError';
    this.code = error.code;
  }
}

export function unwrap<T>(response: PostgrestSingleResponse<T>): T {
  if (response.error) {
    throw new SupabaseError(response.error);
  }

  if (response.data === null) {
    throw new Error('No data returned from Supabase');
  }

  return response.data;
}
