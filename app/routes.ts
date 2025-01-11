import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/layouts/sidebar/index.tsx", [
    index("pages/dashboard/components/pages/dashboard_page.tsx"),
  ]),
  route("ingresar", "pages/login/components/pages/login_page.tsx"),
  route("registrarse", "pages/register/components/pages/register_page.tsx"),
  route(
    "forget-password",
    "pages/forget_password/components/pages/forget_password_page.tsx"
  ),
] satisfies RouteConfig;
