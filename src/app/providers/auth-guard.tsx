import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthContext } from "@entities/auth";

import { Spinner } from "@shared/ui";
type AuthGuardProps = {
  redirectTo?: string;
};

export const AuthGuard = ({ redirectTo = "/login" }: AuthGuardProps) => {
  const { isAuthed, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return <Spinner />;

  if (!isAuthed) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
};
