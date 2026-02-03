import { BorderButton } from '@shared/ui';
import { useAnonymousAuth } from '../model/use-anonymous-auth';

export const AnonymousSignInnButton = () => {
  const { login } = useAnonymousAuth();
  return (
    <BorderButton variant="primary" onClick={login} className="w-full">
      게스트로 둘러보기
    </BorderButton>
  );
};
