import { useQuery } from "@tanstack/react-query";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { LoaderSplash } from "~/components/molecules";
import { ROUTES } from "~/routes/routes";
import { getProfile } from "~/services";

export default function GuestGuard() {
  const location = useLocation();
  const token = window.sessionStorage.getItem("TOKEN_AUTH");

  const { isPending, isError, data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(token),
    enabled: !!token,
    retry: false,
  });

  const currentPath = location.pathname;

  const isRegistering =
    currentPath.includes(ROUTES.AuthRoutes.OnboardingGeneral) ||
    currentPath.includes(ROUTES.AuthRoutes.OnboardingLawyer) ||
    currentPath.includes(ROUTES.AuthRoutes.OnboardingCustomer);

  const isAuthRoute =
    isRegistering ||
    currentPath.includes(ROUTES.AuthRoutes.Login) ||
    currentPath.includes(ROUTES.AuthRoutes.Register);

  if (isError) {
    window.sessionStorage.removeItem("TOKEN_AUTH");

    if (currentPath.includes(ROUTES.AuthRoutes.Login)) {
      window.location.reload();
      return null;
    }

    return <Navigate to={ROUTES.AuthRoutes.Login} replace />;
  }

  if (isRegistering && !token) {
    return <Navigate to={ROUTES.AuthRoutes.Login} replace />;
  }

  if (token && isPending) {
    return <LoaderSplash />;
  }

  if (data?.data && data.data.userType) {
    if (isAuthRoute) {
      if (data.data.userType === "lawyer") {
        return <Navigate to="/app/abogado/casos" replace />;
      }
      if (data.data.userType === "client") {
        return <Navigate to="/app/cliente/casos" replace />;
      }
    }
  }

  return <Outlet />;
}
