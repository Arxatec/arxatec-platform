import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "pages/login/components/pages/login_page.tsx"),
  layout("components/layouts/sidebar/index.tsx", [
    route("dashboard", "pages/dashboard/components/pages/dashboard_page.tsx"),
  ]),
] satisfies RouteConfig;
