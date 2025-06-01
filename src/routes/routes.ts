export enum APP_PATHS {
  // AUTH
  LOGIN = "/iniciar-sesion",
  REGISTER = "/registro",
  FORGOT_PASSWORD = "/recuperar-contrasena",
  VERIFY_ACCOUNT = "/verificar-cuenta",

  // ONBOARDING
  ONBOARDING = "/incorporacion",
  ONBOARDING_LAWYER = "/incorporacion-abogado",
  ONBOARDING_CUSTOMER = "/incorporacion-cliente",

  // DASHBOARD
  DASHBOARD = "/panel",

  // COMMUNITIES
  COMMUNITIES = "/comunidad",

  // POSTS
  POSTS = "/comunidad/publicaciones",
  CREATE_POST = "/comunidad/publicaciones/crear",
  CREATE_COMMUNITY = "/comunidad/crear-comunidad",

  // CALENDAR
  CALENDAR = "/calendario",

  // CHATS
  CHATS = "/chats",

  // CASES
  CASES = "/casos",
  PERSONAL_CASES = "/casos/personal",
  EXPLORER_CASES = "/casos/explorador",
  CASE = "/casos/:id",
  CREATE_CASE = "/casos/crear",

  // ARTICLES
  ARTICLES = "/articulos",
  CREATE_ARTICLE = "/articulos/crear",

  // CLIENTS
  CLIENTS = "/casos/clientes",

  // LAWYERS
  LAWYERS = "/abogados",

  // SETTINGS
  SETTINGS = "/configuracion",

  // PROFILE
  PROFILE = "/perfil",
}

export enum ROUTE_NAMES {
  // AUTH
  LOGIN = "iniciar-sesion",
  REGISTER = "registro",
  FORGOT_PASSWORD = "recuperar-contrasena",
  VERIFY_ACCOUNT = "verificar-cuenta",

  // ONBOARDING
  ONBOARDING = "incorporacion",
  ONBOARDING_LAWYER = "incorporacion-abogado",
  ONBOARDING_CUSTOMER = "incorporacion-cliente",

  // DASHBOARD
  DASHBOARD = "panel",

  // COMMUNITIES
  COMMUNITIES = "comunidad",
  CREATE_COMMUNITY = "crear-comunidad",
  COMMUNITY = ":id",

  // POST
  CREATE_POST = "crear",
  POSTS = "publicaciones",
  POST = ":id",

  // CALENDAR
  CALENDAR = "calendario",

  // CHATS
  CHATS = "chats",

  // CASES
  CASES = "casos",
  PERSONAL_CASES = "personal",
  EXPLORER_CASES = "explorador",
  CASE = ":id",
  CREATE_CASE = "crear",

  // CLIENTS
  CLIENTS = "clientes",

  // SETTINGS
  SETTINGS = "configuracion",

  // ARTICLES
  ARTICLES = "articulos",
  CREATE_ARTICLE = "crear",
  EDIT_ARTICLE = "editar",

  // LAWYERS
  LAWYERS = "abogados",

  // PROFILE
  PROFILE = "perfil",
}
