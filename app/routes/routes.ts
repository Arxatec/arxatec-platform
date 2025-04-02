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

  // SETTINGS
  SETTINGS = "settings",
}
