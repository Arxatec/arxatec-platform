import { Redirect } from "wouter";
import { APP_PATHS } from "~/routes/routes";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = Boolean(window.sessionStorage.getItem("TOKEN_AUTH"));

  if (!isAuthenticated) {
    return <Redirect to={APP_PATHS.LOGIN} />;
  }

  return <>{children}</>;
};
