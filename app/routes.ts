import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";
import { ROUTES } from "./routes/routes";

export default [
  layout("components/layouts/sidebar/index.tsx", [
    ...prefix(ROUTES.COMMUNITY, [
      index(
        "modules/community/features/posts/components/pages/community_page.tsx"
      ),
      route(
        ROUTES.CREATE_POST,
        "modules/community/features/create_post/components/pages/create_post_page.tsx"
      ),
    ]),
    route(
      ROUTES.DASHBOARD,
      "modules/dashboard/features/components/pages/dashboard_page.tsx"
    ),
    route(
      ROUTES.CALENDAR,
      "modules/calendar/components/pages/calendar_page.tsx"
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
    ROUTES.FORGOT_PASSWORD,
    "modules/auth/features/forget_password/components/pages/forget_password_page.tsx"
  ),
] satisfies RouteConfig;
