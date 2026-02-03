import { useState } from 'react';

import { TextField, BaseButton, ErrorMessage, Spinner } from '@shared/ui';
import { useEmailAuth } from '../model/use-email-auth';

type EmailLoginFormProps = {
  mode: 'login' | 'register';
};

export function EmailLoginForm({ mode }: EmailLoginFormProps) {
  const { login, register, loading, error } = useEmailAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      await login(email, btoa(password));
    } else {
      await register(email, btoa(password));
    }
  };

  const isLogin = mode === 'login';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextField
        label="이메일"
        type="email"
        value={email}
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="you@email.com"
        className="pl-10"
      />
      <TextField
        label="비밀번호"
        type="password"
        value={password}
        autoComplete={isLogin ? 'current-password' : 'new-password'}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="8자 이상 입력해주세요"
        className="pl-10"
      />

      {error && (
        <div className="slide-up">
          <ErrorMessage message={error} />
        </div>
      )}

      <BaseButton
        variant="primary"
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? <Spinner /> : isLogin ? '로그인' : '회원가입'}
      </BaseButton>
    </form>
  );
}
