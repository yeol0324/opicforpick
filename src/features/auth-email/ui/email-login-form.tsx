import { useState } from "react";

import {
  SegmentedControl,
  TextField,
  PrimaryButton,
  TextButton,
  ErrorMessage,
} from "@shared/ui";

import { useEmailAuth } from "../model/use-email-auth";

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

  const isLogin = mode === "login";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SegmentedControl
        options={[
          { value: "login", label: "이메일 로그인" },
          { value: "register", label: "회원가입" },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="space-y-4">
        <TextField
          label="이메일"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@email.com"
        />

        <TextField
          label="비밀번호"
          type="password"
          value={password}
          autoComplete={isLogin ? "current-password" : "new-password"}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="8자 이상 입력해주세요"
        />
      </div>

      <ErrorMessage message={error} />

      <PrimaryButton type="submit" disabled={loading}>
        {loading ? "처리 중..." : isLogin ? "로그인" : "회원가입 완료"}
      </PrimaryButton>

      <TextButton
        type="button"
        onClick={() =>
          setMode((prev) => (prev === "login" ? "register" : "login"))
        }
      >
        {isLogin
          ? "아직 계정이 없나요? 회원가입 하기"
          : "이미 계정이 있나요? 로그인 하기"}
      </TextButton>
    </form>
  );
}
