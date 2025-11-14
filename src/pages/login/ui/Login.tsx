import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@entities/auth/model/context";
import { EmailLoginForm } from "@features/auth-email/ui/EmailLoginForm";
import { GuestLoginButton } from "@features/auth-guest/ui/GuestLoginButton";

export function Login() {
  const { auth, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && auth.mode !== "none") {
      navigate("/", { replace: true });
    }
  }, [auth.mode, loading, navigate]);

  return (
    <div>
      <h1>로그인</h1>
      <EmailLoginForm />

      <GuestLoginButton />
    </div>
  );
}
