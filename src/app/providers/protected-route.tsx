import type { JSX } from "react";

import { Navigate } from "react-router-dom";

import { useAuthContext } from "@entities/auth/model/auth-context";

type Props = {
  children: JSX.Element;
};
export function ProtectedRoute({ children }: Props) {
  const { auth, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
