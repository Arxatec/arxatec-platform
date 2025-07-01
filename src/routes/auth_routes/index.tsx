import * as publicPages from "~/modules/shared";
import * as guard from "~/components/guards";
import { ROUTES } from "../../routes/routes";
import { Navigate } from "react-router-dom";

export const authRoutes = {
  path: "/",
  element: <guard.GuestGuard />,
  children: [
    {
      path: "/",
      element: <Navigate to={ROUTES.Auth.Login} replace />,
    },
    {
      path: ROUTES.Auth.Login, //iniciar-sesion
      element: <publicPages.LoginPage />,
    },
    {
      path: ROUTES.Auth.Register, //registrarse
      element: <publicPages.RegisterPage />,
    },
    {
      path: ROUTES.Auth.VerifyAccount,
      element: <publicPages.AccountVerificationPage />,
    },
    {
      path: ROUTES.Auth.RecoverPassword,
      element: <publicPages.ForgotPasswordPage />,
    },
    {
      path: ROUTES.Auth.OnboardingLawyer,
      element: <publicPages.OnboardingLawyerPage />,
    },
    {
      path: ROUTES.Auth.OnboardingGeneral,
      element: <publicPages.OnboardingGeneralPage />,
    },
    {
      path: ROUTES.Auth.OnboardingCustomer,
      element: <publicPages.OnboardingCustomerPage />,
    },
  ],
};
