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
    CreateCase: "/client/cases/create",
  },

  Lawyer: {
    ViewCases: "/lawyer/cases",
    CreateCase: "/lawyer/cases/create",
    ViewClients: "/lawyer/clients",
    ExplorerCases: "/lawyer/cases/explorer",
    CreateClient: "/lawyer/clients/create",
    UpdateClient: "/lawyer/clients/update/:id",
  },

  Error: {
    NotFound: "*",
    Internal: "/500",
  },
};
