import { supabase } from "@shared/api";

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;

  const token = data.session?.access_token;
  return { user: data.user, token };
}
