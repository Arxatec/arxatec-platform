import { useState } from "react";
import { Outlet } from "react-router";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarIcon as CalendarIconActive,
  DocumentDuplicateIcon as DocumentDuplicateIconActive,
  FolderIcon as FolderIconActive,
  HomeIcon as HomeIconActive,
  UsersIcon as UsersIconActive,
  ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterIconActive,
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

const navigationTest = [
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
  {
    name: "Mensajes",
    href: "#",
    iconInactive: ChatBubbleBottomCenterIcon,
    current: false,
    iconActive: ChatBubbleBottomCenterIconActive,
  },
  {
    name: "Comunidades",
    href: "#",
    iconInactive: CalendarIcon,
    current: true,
    iconActive: CalendarIconActive,
    children: [
      {
        name: "Crear comunidad",
        href: "#",
        current: false,

        iconInactive: CalendarIcon,
        iconActive: CalendarIconActive,
      },
      {
        name: "Desarrollo legal",
        href: "#",
        current: false,
        iconInactive: CalendarIcon,
        iconActive: CalendarIconActive,
      },
      {
        name: "Derechos laborales",
        href: "#",
        current: false,
        iconInactive: CalendarIcon,
        iconActive: CalendarIconActive,
      },
    ],
  },
  {
    name: "Recursos",
    href: "#",
    iconInactive: CalendarIcon,
    current: true,
    iconActive: CalendarIconActive,
    children: [
      {
        name: "Acerca de Arxatec",
        href: "#",
        current: false,

        iconInactive: CalendarIcon,
        iconActive: CalendarIconActive,
      },
      {
        name: "Ayuda",
        href: "#",
        current: false,
        iconInactive: CalendarIcon,
        iconActive: CalendarIconActive,
      },
      {
        name: "Nuestro blog",
        href: "#",
        current: false,
        iconInactive: CalendarIcon,
        iconActive: CalendarIconActive,
      },
      {
        name: "Reglas de Arxatec",
        href: "#",
        current: false,
        iconInactive: CalendarIcon,
        iconActive: CalendarIconActive,
      },
      {
        name: "Politica de privacidad",
        href: "#",
        current: false,
        iconInactive: CalendarIcon,
        iconActive: CalendarIconActive,
      },
      {
        name: "Terminos y condiciones",
        href: "#",
        current: false,
        iconInactive: CalendarIcon,
        iconActive: CalendarIconActive,
      },
    ],
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
        <SidebarDesktop navigation={navigationTest} logo={logo} />
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
