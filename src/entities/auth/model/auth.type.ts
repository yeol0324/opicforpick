import type { User } from '@supabase/supabase-js';

export type AuthStateType =
  | { mode: 'none'; user: null }
  | { mode: 'member'; user: User };
