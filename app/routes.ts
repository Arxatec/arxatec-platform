import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";
import { ROUTE_NAMES } from "./routes/routes";

export default [
  index("modules/root/features/root/components/pages/root_page.tsx"),
  layout("components/layouts/root/index.tsx", [
    layout("components/layouts/sidebar/index.tsx", [
      ...prefix(ROUTE_NAMES.COMMUNITIES, [
        index(
          "modules/community/features/communities/components/pages/communities_page.tsx"
        ),
        route(
          ROUTE_NAMES.COMMUNITY,
          "modules/community/features/community/components/pages/community_page.tsx"
        ),
        route(
          ROUTE_NAMES.CREATE_COMMUNITY,
          "modules/community/features/create_community/components/pages/create_community_page.tsx"
        ),
        ...prefix(ROUTE_NAMES.POSTS, [
          index(
            "modules/community/features/posts/components/pages/posts_page.tsx"
          ),
          route(
            ROUTE_NAMES.CREATE_POST,
            "modules/community/features/create_post/components/pages/create_post_page.tsx"
          ),
          route(
            ROUTE_NAMES.POST,
            "modules/community/features/post/components/pages/post_page.tsx"
          ),
        ]),
      ]),
      route(
        ROUTE_NAMES.DASHBOARD,
        "modules/dashboard/features/components/pages/dashboard_page.tsx"
      ),
      route(
        ROUTE_NAMES.CALENDAR,
        "modules/calendar/features/calendar/components/pages/calendar_page.tsx"
      ),
      route(
        ROUTE_NAMES.CHATS,
        "modules/communication/features/chats/components/pages/chats_page.tsx"
      ),
      route(
        ROUTE_NAMES.CASES,
        "modules/cases/features/view_cases/components/pages/view_cases_page.tsx"
      ),
      route(
        ROUTE_NAMES.SETTINGS,
        "modules/settings/features/settings_lawyer/components/pages/settings_lawyer_page.tsx"
      ),
      route(
        ROUTE_NAMES.LAWYERS,
        "modules/lawyers/features/view_lawyers/components/pages/view_lawyers_page.tsx"
      ),
      ...prefix(ROUTE_NAMES.ARTICLES, [
        index(
          "modules/article/features/view_articles/components/pages/view_articles_page.tsx"
        ),
        route(
          ROUTE_NAMES.CREATE_ARTICLE,
          "modules/article/features/create_article/components/pages/create_article_page.tsx"
        ),
      ]),
    ]),
    route(
      ROUTE_NAMES.LOGIN,
      "modules/auth/features/login/components/pages/login_page.tsx"
    ),
    route(
      ROUTE_NAMES.REGISTER,
      "modules/auth/features/register/components/pages/register_page.tsx"
    ),
    route(
      ROUTE_NAMES.VERIFY_ACCOUNT,
      "modules/auth/features/account_verification/components/pages/account_verification.tsx"
    ),
    route(
      ROUTE_NAMES.FORGOT_PASSWORD,
      "modules/auth/features/forget_password/components/pages/forget_password_page.tsx"
    ),
    route(
      ROUTE_NAMES.ONBOARDING,
      "modules/onboarding/features/onboarding_general/components/pages/onboarding_general_page.tsx"
    ),
    route(
      ROUTE_NAMES.ONBOARDING_LAWYER,
      "modules/onboarding/features/onboarding_lawyer/components/pages/onboarding_lawyer_page.tsx"
    ),
    route(
      ROUTE_NAMES.ONBOARDING_CUSTOMER,
      "modules/onboarding/features/onboarding_customer/components/pages/onboarding_customer_page.tsx"
    ),
  ]),
] satisfies RouteConfig;
