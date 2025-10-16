import { ROUTES } from "../routes";
import * as lawyerPages from "@/modules/lawyer";

export const lawyerRoutes = {
  path: "/lawyer",
  children: [
    {
      path: ROUTES.Lawyer.ViewCases,
      element: <lawyerPages.ViewCasesPage />,
    },
    {
      path: ROUTES.Lawyer.CreateCase,
      element: <lawyerPages.CreateCasePage />,
    },
    {
      path: ROUTES.Lawyer.ExplorerCases,
      element: <lawyerPages.ExplorerCasesPage />,
    },
    {
      path: ROUTES.Lawyer.ViewClients,
      element: <lawyerPages.ViewClientsPage />,
    },
    {
      path: ROUTES.Lawyer.CreateClient,
      element: <lawyerPages.CreateClientPage />,
    },
    {
      path: ROUTES.Lawyer.UpdateClient,
      element: <lawyerPages.UpdateClientPage />,
    },
    {
      path: ROUTES.Lawyer.ViewCase,
      element: <lawyerPages.ViewCasePage />,
    },
    {
      path: ROUTES.Lawyer.UpdateCase,
      element: <lawyerPages.UpdateCasePage />,
    },
    {
      path: ROUTES.Lawyer.ViewCalendar,
      element: <lawyerPages.ViewCalendarPage />,
    },
    {
      path: ROUTES.Lawyer.ViewTasks,
      element: <lawyerPages.ViewTasksPage />,
    },
  ],
};
