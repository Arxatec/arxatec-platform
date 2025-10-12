import { ROUTES } from "../routes";
import * as clientPages from "@/modules/client";

export const clientRoutes = {
  path: "/client",
  children: [
    {
      path: ROUTES.Client.ViewCases,
      element: <clientPages.ViewCasesPage />,
    },
    {
      path: ROUTES.Client.ViewCase,
      element: <clientPages.ViewCasePage />,
    },
    {
      path: ROUTES.Client.CreateCase,
      element: <clientPages.CreateCasePage />,
    },
    {
      path: ROUTES.Client.ViewLawyers,
      element: <clientPages.ViewLawyersPage />,
    },
    {
      path: ROUTES.Client.ViewCalendar,
      element: <clientPages.ViewCalendarPage />,
    },
  ],
};
