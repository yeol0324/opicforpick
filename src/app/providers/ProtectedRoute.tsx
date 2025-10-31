import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@entities/auth/model/context";

export function ProtectedRoute() {
  const { auth, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(auth.mode);

  if (auth.mode === "none") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
