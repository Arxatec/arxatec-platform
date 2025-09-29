import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./auth";
import { errorRoutes } from "./error";
import { appRoutes } from "./app";

const routes = [authRoutes, appRoutes, errorRoutes];
const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
  },
});
export default router;
