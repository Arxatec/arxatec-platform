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
    ViewCase: "/client/cases/:id",
    CreateCase: "/client/cases/create",
    ViewLawyers: "/client/lawyers",
    ViewCalendar: "/client/calendar",
  },

  Lawyer: {
    LawyerOnboarding: "/onboarding/lawyer",
    ViewCases: "/lawyer/cases",
    CreateCase: "/lawyer/cases/create",
    ViewClients: "/lawyer/clients",
    ExplorerCases: "/lawyer/cases/explorer",
    CreateClient: "/lawyer/clients/create",
    UpdateClient: "/lawyer/clients/update/:id",
    ViewCase: "/lawyer/cases/:id",
    UpdateCase: "/lawyer/cases/update/:id",
    ViewCalendar: "/lawyer/calendar",
    ViewTasks: "/lawyer/tasks",
  },

  Error: {
    NotFound: "*",
    Internal: "/500",
  },
};
