export enum APP_PATHS {
  // AUTH
  LOGIN = "/login",
  REGISTER = "/register",
  FORGOT_PASSWORD = "/forgot-password",
  VERIFY_ACCOUNT = "/verify-account",

  // ONBOARDING
  ONBOARDING = "/onboarding",
  ONBOARDING_LAWYER = "/onboarding-lawyer",
  ONBOARDING_CUSTOMER = "/onboarding-customer",

  // DASHBOARD
  DASHBOARD = "/dashboard",

  // COMMUNITIES
  COMMUNITIES = "/community",

  // POSTS
  POSTS = "/community/posts",
  CREATE_POST = "/community/posts/create",

  // CALENDAR
  CALENDAR = "/calendar",

  // CHATS
  CHATS = "/chats",

  // CASES
  CASES = "/cases",
  PERSONAL_CASES = "/cases/personal",
  EXPLORER_CASES = "/cases/explorer",
  CASE = "/cases/:id",
  CREATE_CASE = "/cases/create",

  // ARTICLES
  ARTICLES = "/articles",
  CREATE_ARTICLE = "/articles/create",

  // LAWYERS
  LAWYERS = "/lawyers",
}

export enum ROUTE_NAMES {
  // AUTH
  LOGIN = "login",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgot-password",
  VERIFY_ACCOUNT = "verify-account",

  // ONBOARDING
  ONBOARDING = "onboarding",
  ONBOARDING_LAWYER = "onboarding-lawyer",
  ONBOARDING_CUSTOMER = "onboarding-customer",

  // DASHBOARD
  DASHBOARD = "dashboard",

  // COMMUNITIES
  COMMUNITIES = "community",
  COMMUNITY = ":id",

  // POST
  CREATE_POST = "create",
  POSTS = "posts",
  POST = ":id",

  // CALENDAR
  CALENDAR = "calendar",

  // CHATS
  CHATS = "chats",

  // CASES
  CASES = "cases",
  PERSONAL_CASES = "personal",
  EXPLORER_CASES = "explorer",
  CASE = ":id",
  CREATE_CASE = "create",

  // SETTINGS
  SETTINGS = "settings",

  // ARTICLES
  ARTICLES = "articles",
  CREATE_ARTICLE = "create",

  // LAWYERS
  LAWYERS = "lawyers",
}
