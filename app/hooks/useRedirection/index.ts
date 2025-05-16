import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { TOKEN_AUTH } from "~/constants";
import { APP_PATHS } from "~/routes/routes";

export const useRedirection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
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
      navigate(hasToken ? APP_PATHS.DASHBOARD : APP_PATHS.LOGIN);
      return;
    }

    if (isAuthPath && hasToken) {
      navigate(APP_PATHS.DASHBOARD);
    }
  }, [location.pathname, navigate]);
};
