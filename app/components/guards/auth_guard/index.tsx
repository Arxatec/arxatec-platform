import { Navigate } from "react-router";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { APP_PATHS } from "~/routes/routes";

export const AuthGuard = () => {
  const location = useLocation();
  const isAuthenticated = Boolean(window.sessionStorage.getItem("TOKEN_AUTH"));

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={APP_PATHS.LOGIN} state={{ from: location }} replace />
  );
};
