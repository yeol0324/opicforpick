import { createContext, useContext } from 'react';

import type { AuthStateType } from './auth.type';

export type AuthContextValue = {
  auth: AuthStateType;
  isLoading: boolean;
  isAuthed: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInAsAnonymous: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('AuthProvider 내부에서 호출 필요');
  }
  return ctx;
}
