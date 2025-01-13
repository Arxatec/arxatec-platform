import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";
import { ROUTES } from "./routes/routes";

export default [
  layout("components/layouts/sidebar/index.tsx", [
    index("modules/dashboard/components/pages/dashboard_page.tsx"),
    route(
      ROUTES.COMMUNITY,
      "modules/community/components/pages/community_page.tsx"
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
