export const ROUTES = {
  Auth: {
    Login: "/login",
    Register: "/register",
    VerifyAccount: "/verify-account",
    RecoverPassword: "/recover-password",
    VerifyPasswordReset: "/verify-password-reset",
    ChangePassword: "/change-password",
  },

  Client: {
    ViewCases: "/cases",
  },

  Lawyer: {
    ViewCases: "/cases",
  },

  Error: {
    NotFound: "*",
    Internal: "/500",
  },
};
