import { useEffect } from "react";
import { useLocation } from "wouter";
import { TOKEN_AUTH } from "~/constants";
import { APP_PATHS } from "~/routes/routes";

export const useRedirection = () => {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const currentPath = location;
    const isRootPath = currentPath === "/";
    const authPaths = [
      APP_PATHS.LOGIN,
      APP_PATHS.REGISTER,
      APP_PATHS.FORGOT_PASSWORD,
      APP_PATHS.VERIFY_ACCOUNT,
    ];
    const isAuthPath = authPaths.includes(currentPath as APP_PATHS);
    const hasToken = window.sessionStorage.getItem(TOKEN_AUTH) !== null;

    if (isRootPath) {
      setLocation(hasToken ? APP_PATHS.DASHBOARD : APP_PATHS.LOGIN);
      return;
    }

    if (isAuthPath && hasToken) {
      setLocation(APP_PATHS.DASHBOARD);
    }
  }, [location, setLocation]);
};
