import { BaseButton } from '@shared/ui';
import { useAnonymousAuth } from '../use-anonymous-auth';

export const AnonymousLoginButton = () => {
  const { login } = useAnonymousAuth();
  return <BaseButton onClick={login}>익명으로 로그인</BaseButton>;
};
