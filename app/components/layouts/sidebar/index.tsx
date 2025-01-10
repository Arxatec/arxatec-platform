import { useState } from "react";
import { Outlet } from "react-router";
import {
  CalendarIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import logo from "~/assets/images/logo.png";

import { SidebarMobile } from "./sidebar_mobile";
import { SidebarDesktop } from "./sidebar_desktop";
import { Navigation } from "./navigation";

const navigation = [
  { name: "Comunidad", href: "#", icon: HomeIcon, current: true },
  { name: "Dashboard", href: "#", icon: UsersIcon, current: false },
  { name: "Calendario", href: "#", icon: FolderIcon, current: false },
  { name: "Mis casos", href: "#", icon: CalendarIcon, current: false },
  {
    name: "Documentos",
    href: "#",
    icon: DocumentDuplicateIcon,
    current: false,
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
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
