import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@entities/auth/model/auth-context";
import { EmailLoginForm } from "@features/auth-email/ui/EmailLoginForm";
import { DemoLoginButton } from "@features/auth-demo/ui/DemoLoginButton";
import { CenterColumn, Card } from "@shared/ui";

export function Login() {
  const { auth, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && auth.mode !== "none") {
      navigate("/", { replace: true });
    }
  }, [auth.mode, loading, navigate]);

  return (
    <CenterColumn>
      <header className="mb-8">
        <p className="text-xs font-semibold tracking-[0.12em] text-teal-500">
          OPIC FORPIC
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">로그인</h1>
      </header>

      <Card>
        <EmailLoginForm />
      </Card>

      <section className="mt-4">
        <DemoLoginButton />
      </section>
    </CenterColumn>
  );
}
