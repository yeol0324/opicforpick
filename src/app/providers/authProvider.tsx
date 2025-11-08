import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@shared/api";
import { AuthContext, type AuthState } from "@entities/auth";
import type { Session } from "@supabase/supabase-js";

const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    mode: "none",
    user: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        applySession(session);
      } else {
        setAuth({
          mode: "none",
          user: null,
        });
      }

      setLoading(false);
    };

    init();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        applySession(session);
        return;
      }

      if (event === "SIGNED_OUT") {
        setAuth({
          mode: "none",
          user: null,
        });
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const applySession = (session: Session) => {
    setAuth({
      mode: "member",
      user: session.user,
    });
  };

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
    setAuth({ mode: "none", user: null });
  };

  const loginAsDemo = async () => {
    if (!demoEmail || !demoPassword) {
      throw new Error("Demo 계정 env가 설정되어 있지 않습니다.");
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: demoEmail,
      password: demoPassword,
    });

    if (error) throw error;
    // 세션 생성 후 onAuthStateChange / init에서 applySession이 알아서 태움
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
