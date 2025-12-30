import { useAuthContext } from "@entities/auth";

import { BaseButton, Card } from "@shared/ui";

export const ProfilePage = () => {
  const auth = useAuthContext();
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 overflow-hidden">
      <Card className="w-full">
        <h2>{auth.auth.user?.email}</h2>
        <BaseButton onClick={handleLogout}>로그아웃</BaseButton>
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
