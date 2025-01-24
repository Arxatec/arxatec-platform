import { useState } from "react";
import { Outlet } from "react-router";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  ChatBubbleBottomCenterIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarIcon as CalendarIconActive,
  FolderIcon as FolderIconActive,
  HomeIcon as HomeIconActive,
  UsersIcon as UsersIconActive,
  ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterIconActive,
  InformationCircleIcon as InformationCircleIconActive,
  QuestionMarkCircleIcon as QuestionMarkCircleIconActive,
  PencilSquareIcon as PencilSquareIconActive,
  DocumentTextIcon as DocumentTextIconActive,
  ShieldCheckIcon as ShieldCheckIconActive,
  DocumentDuplicateIcon as DocumentDuplicateIconActive,
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
    iconActive: CalendarIconActive,
    current: true,
    children: [
      {
        name: "Crear comunidad",
        href: "#",
        current: false,
        iconInactive: PlusIcon,
        iconActive: PlusIcon,
      },
      {
        name: "Desarrollo legal",
        href: "#",
        current: false,
        image:
          "https://images.pexels.com/photos/5727885/pexels-photo-5727885.jpeg",
      },
      {
        name: "Derechos laborales",
        href: "#",
        current: false,
        image:
          "https://images.pexels.com/photos/5648040/pexels-photo-5648040.jpeg",
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
        iconInactive: InformationCircleIcon,
        iconActive: InformationCircleIconActive,
      },
      {
        name: "Ayuda",
        href: "#",
        current: false,
        iconInactive: QuestionMarkCircleIcon,
        iconActive: QuestionMarkCircleIconActive,
      },
      {
        name: "Nuestro blog",
        href: "#",
        current: false,
        iconInactive: PencilSquareIcon,
        iconActive: PencilSquareIconActive,
      },
      {
        name: "Reglas de Arxatec",
        href: "#",
        current: false,
        iconInactive: DocumentTextIcon,
        iconActive: DocumentTextIconActive,
      },
      {
        name: "Politica de privacidad",
        href: "#",
        current: false,
        iconInactive: ShieldCheckIcon,
        iconActive: ShieldCheckIconActive,
      },
      {
        name: "Terminos y condiciones",
        href: "#",
        current: false,
        iconInactive: DocumentDuplicateIcon,
        iconActive: DocumentDuplicateIconActive,
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
          <main className="bg-slate-100 py-10 h-full">
            <div className="px-4 sm:px-6 lg:px-8 h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
