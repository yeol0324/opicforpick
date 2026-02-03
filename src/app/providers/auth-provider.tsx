import { useEffect, useState, type ReactNode } from 'react';

import type { Session } from '@supabase/supabase-js';

import { AuthContext, type AuthStateType } from '@entities/auth';

import { supabase } from '@shared/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthStateType>({
    mode: 'none',
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const isAuthed = auth.mode === 'member';

  const applySession = (session: Session) => {
    setAuth({
      mode: 'member',
      user: session.user,
    });
  };

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        applySession(session);
      } else {
        setAuth({
          mode: 'none',
          user: null,
        });
      }

      setIsLoading(false);
    };

    init();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        applySession(session);
        return;
      }

      if (event === 'SIGNED_OUT') {
        setAuth({
          mode: 'none',
          user: null,
        });
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAuth({ mode: 'none', user: null });
  };

  const signInAsAnonymous = async () => {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        isLoading,
        isAuthed,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        signInAsAnonymous,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
