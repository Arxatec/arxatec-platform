import * as publicPages from "~/modules/shared";
import * as guard from "~/components/guards";
import { ROUTES } from "../../routes/routes";

export const authRoutes = {
  path: "/",
  element: <guard.GuestGuard />,
  children: [
    {
      path: ROUTES.Auth.Login,
      element: <publicPages.LoginPage />,
    },
    {
      path: ROUTES.Auth.Register,
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
