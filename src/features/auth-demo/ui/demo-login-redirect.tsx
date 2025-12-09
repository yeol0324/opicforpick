import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuthContext } from "@entities/auth/model/auth-context";

export function DemoLoginRedirect() {
  const { loginAsDemo } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setError(null);
        await loginAsDemo();
        navigate("/", { replace: true });
      } catch (error) {
        let message = "임시로그인 실패";

        if (error instanceof Error && error.message) {
          message = error.message;
        }

        setError(message);
      }
    };

    run();
  }, [loginAsDemo, navigate]);

  if (error) {
    return <div className="p-4 text-center text-sm text-red-600">{error}</div>;
  }

  return (
    <div className="p-4 text-center text-sm text-gray-600">
      임시 계정으로 로그인
    </div>
  );
}
