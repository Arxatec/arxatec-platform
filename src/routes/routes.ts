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
    ViewCases: "/client/cases",
  },

  Lawyer: {
    ViewCases: "/lawyer/cases",
    CreateCase: "/lawyer/cases/create",
  },

  Error: {
    NotFound: "*",
    Internal: "/500",
  },
};
