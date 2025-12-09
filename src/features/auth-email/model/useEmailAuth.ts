import { useState } from "react";
import { useAuthContext } from "@entities/auth/model/auth-context";

export function useEmailAuth() {
  const { signInWithEmail, signUpWithEmail } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmail(email, password);
    } catch (e: any) {
      setError(e?.message ?? "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await signUpWithEmail(email, password);
    } catch (e: any) {
      setError(e?.message ?? "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading,
    error,
  };
}
