import * as guard from "@/components/guards";
import * as layout from "@/components/layout";
import { lawyerRoutes } from "../lawyer";
import { clientRoutes } from "../client";

export const appRoutes = {
  path: "/",
  element: <guard.Auth />,
  children: [
    {
      element: <guard.Role />,
      children: [
        {
          element: <layout.Sidebar />,
          children: [lawyerRoutes, clientRoutes],
        },
      ],
    },
  ],
};
