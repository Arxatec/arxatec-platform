import * as client from "~/modules/client";
import { ROUTES } from "../routes";

export const clientRoutes = {
  path: "/cliente",
  children: [
    {
      path: ROUTES.Client.CasesCreate,
      element: <client.ClientCreateCasePage />,
    },
    {
      path: ROUTES.Client.CasesPersonal,
      element: <client.ClientViewCases />,
    },
    {
      path: ROUTES.Client.CaseDetail,
      element: <client.ClientViewCase />,
    },
  ],
};
