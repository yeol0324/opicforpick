import { useNavigate } from "react-router-dom";

import { TextButton } from "@shared/ui";

export function DemoLoginButton() {
  const navigate = useNavigate();

  return (
    <TextButton onClick={() => navigate("/demo-login")}>
      임시 계정으로 로그인
    </TextButton>
  );
}
