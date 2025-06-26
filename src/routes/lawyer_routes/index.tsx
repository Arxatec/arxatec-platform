import * as laywer from "~/modules/laywer";
import { ROUTES } from "../routes";

export const lawyerRoutes = {
  path: "/abogado",
  children: [
    {
      path: ROUTES.Lawyer.CasesPersonal,
      element: <laywer.LawyerPersonalCasesPage />,
    },
    {
      path: ROUTES.Lawyer.CasesExplorer,
      element: <laywer.LawyerExplorerCasesPage />,
    },
    {
      path: ROUTES.Lawyer.CasesCreate,
      element: <laywer.LawyerCreateCasePage />,
    },
    {
      path: ROUTES.Lawyer.CasesClients,
      element: <laywer.LawyerClientsPage />,
    },
    {
      path: ROUTES.Lawyer.CaseDetail,
      element: <laywer.LawyerViewCasePage />,
    },
    {
      path: ROUTES.Lawyer.Cases,
      element: <laywer.LawyerViewCasesPage />,
    },
  ],
};
