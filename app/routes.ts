import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "pages/login/components/pages/login_page.tsx"),
] satisfies RouteConfig;
