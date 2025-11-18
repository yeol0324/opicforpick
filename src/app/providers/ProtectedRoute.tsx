import { Navigate } from "react-router-dom";
import { useAuthContext } from "@entities/auth/model/context";
import type { JSX } from "react";

type Props = {
  children: JSX.Element;
};
export function ProtectedRoute({ children }: Props) {
  const { auth, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (auth.mode === "none") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
