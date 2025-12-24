import { Navigate, Outlet } from "react-router-dom";

type AuthGuardProps = {
  isAuthed: boolean;
};

export const AuthGuard = ({ isAuthed }: AuthGuardProps) => {
  if (!isAuthed) return <Navigate to="/login" replace />;
  return <Outlet />;
};
