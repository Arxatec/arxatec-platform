import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";
import { ROUTES } from "./routes/routes";

export default [
  index("modules/root/features/root/components/pages/root_page.tsx"),
  layout("components/layouts/root/index.tsx", [
    layout("components/layouts/sidebar/index.tsx", [
      ...prefix(ROUTES.COMMUNITIES, [
        index(
          "modules/community/features/communities/components/pages/communities_page.tsx"
        ),
        route(
          ROUTES.COMMUNITY,
          "modules/community/features/community/components/pages/community_page.tsx"
        ),
        route(
          ROUTES.POSTS,
          "modules/community/features/posts/components/pages/posts_page.tsx"
        ),
        route(
          ROUTES.CREATE_POST,
          "modules/community/features/create_post/components/pages/create_post_page.tsx"
        ),
        route(
          ROUTES.POST,
          "modules/community/features/post/components/pages/post_page.tsx"
        ),
      ]),
      route(
        ROUTES.DASHBOARD,
        "modules/dashboard/features/components/pages/dashboard_page.tsx"
      ),
      route(
        ROUTES.CALENDAR,
        "modules/calendar/features/calendar/components/pages/calendar_page.tsx"
      ),
      route(
        ROUTES.CHATS,
        "modules/communication/features/chats/components/pages/chats_page.tsx"
      ),
      route(
        ROUTES.CASES,
        "modules/cases/features/view_cases/components/pages/view_cases_page.tsx"
      ),
    ]),
    route(
      ROUTES.LOGIN,
      "modules/auth/features/login/components/pages/login_page.tsx"
    ),
    route(
      ROUTES.REGISTER,
      "modules/auth/features/register/components/pages/register_page.tsx"
    ),
    route(
      ROUTES.VERIFY_ACCOUNT,
      "modules/auth/features/account_verification/components/pages/account_verification.tsx"
    ),
    route(
      ROUTES.FORGOT_PASSWORD,
      "modules/auth/features/forget_password/components/pages/forget_password_page.tsx"
    ),
    route(
      ROUTES.ONBOARDING,
      "modules/onboarding/features/onboarding_general/components/pages/onboarding_general_page.tsx"
    ),
    route(
      ROUTES.ONBOARDING_LAWYER,
      "modules/onboarding/features/onboarding_lawyer/components/pages/onboarding_lawyer_page.tsx"
    ),
    route(
      ROUTES.ONBOARDING_CUSTOMER,
      "modules/onboarding/features/onboarding_customer/components/pages/onboarding_customer_page.tsx"
    ),
  ]),
] satisfies RouteConfig;
