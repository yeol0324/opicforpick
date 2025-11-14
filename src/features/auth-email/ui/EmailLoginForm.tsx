import { useState } from "react";
import { useEmailAuth } from "../model/useEmailAuth";

export function EmailLoginForm() {
  const { login, register, loading, error } = useEmailAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      await login(email, btoa(password));
    } else {
      await register(email, btoa(password));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{mode === "login" ? "로그인" : "회원가입"}</h3>

      <div>
        <label>
          이메일
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
      </div>
      <div>
        <label>
          비밀번호
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "처리 중..." : mode === "login" ? "로그인" : "회원가입"}
      </button>

      <button
        type="button"
        onClick={() =>
          setMode((prev) => (prev === "login" ? "register" : "login"))
        }
      >
        {mode === "login" ? "회원가입으로 전환" : "로그인으로 전환"}
      </button>
    </form>
  );
}
