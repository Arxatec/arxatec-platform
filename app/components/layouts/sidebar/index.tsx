import { useState } from "react";
import { Outlet } from "react-router";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarIcon as CalendarIconActive,
  DocumentDuplicateIcon as DocumentDuplicateIconActive,
  FolderIcon as FolderIconActive,
  HomeIcon as HomeIconActive,
  UsersIcon as UsersIconActive,
} from "@heroicons/react/24/solid";
import logo from "~/assets/images/logo.png";

import { SidebarMobile } from "./sidebar_mobile";
import { SidebarDesktop } from "./sidebar_desktop";
import { Navigation } from "./navigation";
import { ROUTES } from "~/routes/routes";

const navigation = [
  {
    name: "Dashboard",
    href: ROUTES.DASHBOARD,
    iconInactive: HomeIcon,
    iconActive: HomeIconActive,
    current: false,
  },
  {
    name: "Comunidad",
    href: ROUTES.COMMUNITY,
    current: true,
    iconInactive: UsersIcon,
    iconActive: UsersIconActive,
  },
  {
    name: "Mis casos",
    href: "#",
    iconInactive: FolderIcon,
    current: false,
    iconActive: FolderIconActive,
  },
  {
    name: "Calendario",
    href: ROUTES.CALENDAR,
    iconInactive: CalendarIcon,
    current: false,
    iconActive: CalendarIconActive,
  },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <SidebarMobile
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
          logo={logo}
        />
        <SidebarDesktop navigation={navigation} logo={logo} />
        <div className="lg:pl-72">
          <Navigation setSidebarOpen={setSidebarOpen} />
          <main className="py-10 bg-slate-100">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
