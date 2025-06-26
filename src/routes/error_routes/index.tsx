import * as publicPages from "~/modules/shared";

export const errorRoutes = {
  path: "*",
  element: <publicPages.NotFoundPage />,
};
