import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@shared/api";
import { getDeviceId } from "@shared/lib/device-id";
import { isGuestMarked, markGuest, clearGuest } from "@shared/lib/auth-storage";
import { AuthContext } from "@entities/auth/model/context";
import type { AuthState } from "@entities/auth/model/types";
import type { Session } from "@supabase/supabase-js";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    mode: "none",
    user: null,
    deviceId: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        applySession(session);
      } else if (isGuestMarked()) {
        const id = getDeviceId();
        setAuth({
          mode: "guest",
          user: null,
          deviceId: id,
        });
      } else {
        setAuth({
          mode: "none",
          user: null,
          deviceId: null,
        });
      }

      setLoading(false);
    };

    init();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[onAuthStateChange]", event, session);

      if (session?.user) {
        applySession(session);
        return;
      }

      if (event === "SIGNED_OUT") {
        clearGuest();
        setAuth({
          mode: "none",
          user: null,
          deviceId: null,
        });
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const applySession = (session: Session) => {
    clearGuest();
    setAuth({
      mode: "member",
      user: session.user,
      deviceId: null,
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
    clearGuest();
    setAuth({ mode: "none", user: null, deviceId: null });
  };

  const loginAsGuest = () => {
    const id = getDeviceId();
    markGuest();
    setAuth({
      mode: "guest",
      user: null,
      deviceId: id,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        loginAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
