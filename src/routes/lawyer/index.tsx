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
  ],
};
