import { createClient } from '@supabase/supabase-js';

import { ENV } from '@shared/config/env';

import type { Database } from './generated/database';

export const supabase = createClient<Database>(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true, // 로컬 세션 유지
      autoRefreshToken: true,
    },
  },
);
