import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoaderSplash } from "~/components/molecules";
import { ROUTES } from "~/routes/routes";
import { useAuth } from "~/hooks/useAuth";

export default function GuestGuard() {
  const location = useLocation();
  const { token, user, isPending, isError } = useAuth();

  const currentPath = location.pathname;

  const isRegistering =
    currentPath.includes(ROUTES.Auth.OnboardingGeneral) ||
    currentPath.includes(ROUTES.Auth.OnboardingLawyer) ||
    currentPath.includes(ROUTES.Auth.OnboardingCustomer);

  const isAuthRoute =
    isRegistering ||
    currentPath.includes(ROUTES.Auth.Login) ||
    currentPath.includes(ROUTES.Auth.Register);

  if (isError) {
    window.localStorage.removeItem("TOKEN_AUTH");

    if (currentPath.includes(ROUTES.Auth.Login)) {
      window.location.reload();
      return null;
    }

    return <Navigate to={ROUTES.Auth.Login} replace />;
  }

  if (isRegistering && !token) {
    return <Navigate to={ROUTES.Auth.Login} replace />;
  }

  if (token && isPending) return <LoaderSplash />;

  if (user?.userType) {
    if (isAuthRoute) {
      if (user.userType === "lawyer") {
        return <Navigate to={ROUTES.Lawyer.Cases} replace />;
      }
      if (user.userType === "client") {
        return <Navigate to={ROUTES.Client.CasesPersonal} replace />;
      }
    }
  }

  return <Outlet />;
}
