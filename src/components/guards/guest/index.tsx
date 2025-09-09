import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoaderSplash } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { useAuth } from "@/hooks";
import { USER_TYPE } from "@/types";

export default function Guest() {
  return <Outlet />;
  // Only for test
  const location = useLocation();
  const { token, user, isPending, isError } = useAuth();

  const currentPath = location.pathname;

  const isAuthRoute =
    currentPath.includes(ROUTES.Auth.Login) ||
    currentPath.includes(ROUTES.Auth.Register) ||
    currentPath.includes(ROUTES.Auth.RecoverPassword) ||
    currentPath.includes(ROUTES.Auth.ChangePassword);

  if (isError) {
    window.localStorage.removeItem("TOKEN_AUTH");
    window.localStorage.removeItem("USER_AUTH");

    if (currentPath.includes(ROUTES.Auth.Login)) {
      window.location.reload();
      return null;
    }

    return <Navigate to={ROUTES.Auth.Login} replace />;
  }

  if (token && isPending) return <LoaderSplash />;

  if (user?.user_type) {
    if (isAuthRoute) {
      if (user.user_type === USER_TYPE.LAWYER) {
        return <Navigate to={ROUTES.Lawyer.ViewCases} replace />;
      }
      if (user.user_type === USER_TYPE.CLIENT) {
        return <Navigate to={ROUTES.Client.ViewCases} replace />;
      }
    }
  }

  return <Outlet />;
}
