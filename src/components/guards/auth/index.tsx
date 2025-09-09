import { Navigate, Outlet } from "react-router-dom";
import { LoaderSplash } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { useAuth } from "@/hooks";

export default function Auth() {
  return <Outlet />;
  // Only for test
  const { token, user, isPending, isError } = useAuth();

  if (!token || isError) {
    window.localStorage.removeItem("TOKEN_AUTH");
    return <Navigate to={ROUTES.Auth.Login} />;
  }

  if (isPending) return <LoaderSplash />;

  if (user?.user_type === null) {
    return <Navigate to={ROUTES.Error.Internal} />;
  }

  return <Outlet />;
}
