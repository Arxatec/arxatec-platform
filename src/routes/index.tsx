import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./auth";
import { errorRoutes } from "./error";
import { appRoutes } from "./app";

const routes = [authRoutes, appRoutes, errorRoutes];
const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    // v7_startTransition: true, // No disponible en v6.30.1, actualizar React Router a v6.31+ para usar este flag
  },
});
export default router;
