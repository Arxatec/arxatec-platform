import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"), // /
  route("ingresar", "pages/login/components/pages/login_page.tsx"), // /ingresar
  route(
    "forget-password",
    "pages/forget_password/components/pages/forget_password_page.tsx"
  ),
  layout("components/layouts/sidebar/index.tsx", [
    route("dashboard", "pages/dashboard/components/pages/dashboard_page.tsx"),
  ]),
] satisfies RouteConfig;
