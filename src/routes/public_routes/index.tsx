import * as publicPages from "~/modules/shared";
import { ROUTES } from "../routes";

export const publicRoutes = {
  path: "/",
  children: [
    {
      path: ROUTES.Public.ArticlesCreate,
      element: <publicPages.ArticleEditorPage />,
    },
    {
      path: ROUTES.Public.ArticlesEdit,
      element: <publicPages.ArticleEditorPage />,
    },
    {
      path: ROUTES.Public.Articles,
      element: <publicPages.ViewArticlesPage />,
    },
  ],
};
