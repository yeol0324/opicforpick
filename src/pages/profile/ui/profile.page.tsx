import { useAuthContext } from '@entities/auth';

import { BorderButton, Card } from '@shared/ui';

export const ProfilePage = () => {
  const auth = useAuthContext();
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <Card className="w-full">
        <h2>{auth.auth.user?.email}</h2>
        <BorderButton variant="primary" onClick={handleLogout}>
          로그아웃
        </BorderButton>
      </Card>
      <Card className="w-full">
        <ul>
          <li>
            <span>나의 단계</span>
          </li>
          <li>
            <span>나의 문장 수</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};
