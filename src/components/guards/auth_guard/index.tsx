import { Navigate, Outlet } from "react-router-dom";
import { LoaderSplash } from "~/components/molecules/loader_splash";
import { ROUTES } from "~/routes/routes";
import { useAuth } from "~/hooks/useAuth";

export default function AuthGuard() {
  const { token, user, isPending, isError, error } = useAuth();

  if (!token || isError) {
    window.localStorage.removeItem("TOKEN_AUTH");
    if (error?.message) {
      window.localStorage.setItem("ERROR_JOIN", error.message);
    }
    return <Navigate to={ROUTES.Auth.Login} />;
  }

  if (isPending) return <LoaderSplash />;

  if (user?.userType === null) {
    return <Navigate to={ROUTES.Auth.OnboardingGeneral} />;
  }

  return <Outlet />;
}
