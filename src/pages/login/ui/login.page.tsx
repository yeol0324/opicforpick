import { useState } from 'react';
import { Sparkles } from 'lucide-react';

import { EmailLoginForm, ModeToggleButton } from '@features/auth-email';
import { AnonymousSignInnButton } from '@features/auth-anonymous';
import { Card, Divider, TextLogo } from '@shared/ui';

export function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const isLogin = mode === 'login';

  return (
    <main className="flex-col-center mx-auto min-h-screen px-4">
      <Card className="w-full max-w-md">
        <div className="flex-col-center mb-3 gap-2">
          <Sparkles className="h-10 w-10 text-brand" />
          <TextLogo />
        </div>

        <EmailLoginForm mode={mode} />

        {isLogin && (
          <div className="mt-6 space-y-4">
            <Divider label="OR" />
            <AnonymousSignInnButton />
            <ModeToggleButton mode={mode} onToggle={toggleMode} />
          </div>
        )}
      </Card>
    </main>
  );
}
