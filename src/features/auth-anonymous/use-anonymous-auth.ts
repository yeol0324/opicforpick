import { useAuthContext } from '@entities/auth';

export const useAnonymousAuth = () => {
  const { signInAsAnonymous } = useAuthContext();

  const login = () => {
    signInAsAnonymous();
  };

  return { login };
};
