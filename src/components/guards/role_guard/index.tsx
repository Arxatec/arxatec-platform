import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "~/hooks/useAuth";
import { ROUTES } from "~/routes/routes";

export default function RoleGuard() {
  const { user } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  if (!user?.userType) return null;

  const isLawyerRoute = path.startsWith(ROUTES.Lawyer.Base);
  const isClientRoute = path.startsWith(ROUTES.Client.Base);
  const isPublicRoute = path.startsWith(ROUTES.Public.Articles);

  const canAccess =
    (user.userType === "lawyer" && isLawyerRoute) ||
    (user.userType === "client" && isClientRoute) ||
    isPublicRoute;

  if (!canAccess) {
    // Redirige al home del rol correcto
    const fallback =
      user.userType === "lawyer"
        ? ROUTES.Lawyer.Cases
        : ROUTES.Client.CasesPersonal;

    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}
