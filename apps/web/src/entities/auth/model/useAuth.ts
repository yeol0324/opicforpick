import { useEffect, useState } from "react";
import { supabase } from "@shared/api/supabase";

export function useAuth() {
  const [session, setSession] = useState(() =>
    supabase.auth.getSession().then((r) => r.data.session)
  );

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(Promise.resolve(s))
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password });

  const signOut = () => supabase.auth.signOut();

  return { session, signIn, signOut };
}
