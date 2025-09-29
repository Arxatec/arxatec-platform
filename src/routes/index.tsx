import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./auth";
import { errorRoutes } from "./error";
import { appRoutes } from "./app";

const routes = [authRoutes, appRoutes, errorRoutes];
const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
  },
});
export default router;
