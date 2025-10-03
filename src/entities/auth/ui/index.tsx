import { supabase } from "@shared/api/supabase";
import { useState } from "react";

export function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      return;
    }
    setToken(data.session?.access_token);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        className="border p-2 w-full"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button className="rounded bg-blue-600 px-4 py-2 text-white">
        로그인
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {token && (
        <p className="text-xs break-all text-slate-600">token: {token}</p>
      )}
    </form>
  );
}
