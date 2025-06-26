import * as guard from "~/components/guards";
import * as layout from "~/components/layouts";
import { lawyerRoutes } from "../lawyer_routes";
import { clientRoutes } from "../client_routes";
import { publicRoutes } from "../public_routes";

export const appRoutes = {
  path: "/",
  element: <guard.AuthGuard />,
  children: [
    {
      element: <guard.RoleGuard />,
      children: [
        {
          element: <layout.Sidebar />,
          children: [lawyerRoutes, clientRoutes, publicRoutes],
        },
      ],
    },
  ],
};
