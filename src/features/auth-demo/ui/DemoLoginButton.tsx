import { TextButton } from "@shared/ui";
import { useNavigate } from "react-router-dom";

export function DemoLoginButton() {
  const navigate = useNavigate();

  return (
    <TextButton onClick={() => navigate("/demo-login")}>
      임시 계정으로 로그인
    </TextButton>
  );
}
