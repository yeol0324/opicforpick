// src/shared/api/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { ENV } from "@shared/config/env";

export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);
