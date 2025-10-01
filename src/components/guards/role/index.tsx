import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { USER_TYPE } from "@/types";

export default function Role() {
  const { user } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  if (!user?.user_type) return null;

  const isLawyerRoute = path.startsWith("/lawyer");
  const isClientRoute = path.startsWith("/client");

  const canAccess =
    (user?.user_type === USER_TYPE.LAWYER && isLawyerRoute) ||
    (user?.user_type === USER_TYPE.CLIENT && isClientRoute);

  if (!canAccess) {
    const fallback =
      user?.user_type === USER_TYPE.LAWYER
        ? ROUTES.Lawyer.ViewCases
        : user?.user_type === USER_TYPE.CLIENT
        ? ROUTES.Client.ViewCases
        : ROUTES.Client.ViewCases;

    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}
