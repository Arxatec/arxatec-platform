export const ROUTES = {
  // Auth base
  Auth: "/auth",
  AuthRoutes: {
    VerifyAccount: "/verificar-cuenta",
    RecoverPassword: "/recuperar-contrasena",
    Login: "/iniciar-sesion",
    Register: "/registro",
    OnboardingLawyer: "/incorporacion-abogado",
    OnboardingCustomer: "/incorporacion-cliente",
    OnboardingGeneral: "/incorporacion",
  },

  // App base
  App: "/app",
  AppRoutes: {
    // Lawyer
    LawyerCasesPersonal: "/abogado/casos/personal",
    LawyerCasesExplorer: "/abogado/casos/explorador",
    LawyerCasesCreate: "/abogado/casos/crear",
    LawyerCasesClients: "/abogado/casos/clientes",
    LawyerCasesDetail: "/abogado/casos/:id",
    LawyerCases: "/abogado/casos",

    // Articles
    ArticlesCreate: "/articulos/crear",
    ArticlesEdit: "/articulos/editar/:id",
    Articles: "/articulos",
  },

  // NotFound
  NotFound: "*",
};
