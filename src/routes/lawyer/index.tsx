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
  ],
};
