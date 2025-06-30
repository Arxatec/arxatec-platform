export const ROUTES = {
  Auth: {
    VerifyAccount: "/verificar-cuenta",
    RecoverPassword: "/recuperar-contrasena",
    Login: "/iniciar-sesion",
    Register: "/registro",
    OnboardingLawyer: "/incorporacion-abogado",
    OnboardingCustomer: "/incorporacion-cliente",
    OnboardingGeneral: "/incorporacion",
  },

  Lawyer: {
    Base: "/abogado",
    CasesPersonal: "/abogado/casos/personal",
    CasesExplorer: "/abogado/casos/explorador",
    CasesCreate: "/abogado/casos/crear",
    CasesClients: "/abogado/casos/clientes",
    CaseDetail: "/abogado/casos/:id",
    Cases: "/abogado/casos",
  },

  Client: {
    Base: "/cliente",
    CasesCreate: "/cliente/casos/crear",
    CasesPersonal: "/cliente/casos/personal",
    CaseDetail: "/cliente/casos/personal/:id",
  },

  Public: {
    ArticlesCreate: "/articulos/crear",
    ArticlesEdit: "/articulos/editar/:id",
    Articles: "/articulos",
  },

  NotFound: "*",
};
