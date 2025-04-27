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
  GlobeAltIcon,
  BuildingLibraryIcon,
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
  GlobeAltIcon as GlobeAltIconActive,
  BuildingLibraryIcon as BuildingLibraryIconActive,
} from "@heroicons/react/24/solid";
import logo from "~/assets/images/logo.png";

import { SidebarMobile } from "./sidebar_mobile";
import { SidebarDesktop } from "./sidebar_desktop";
import { Navigation } from "./navigation";
import { APP_PATHS } from "~/routes/routes";

const navigationTest = [
  {
    name: "Dashboard",
    href: APP_PATHS.DASHBOARD,
    iconInactive: HomeIcon,
    iconActive: HomeIconActive,
  },
  {
    name: "Comunidad",
    href: APP_PATHS.POSTS,
    iconInactive: UsersIcon,
    iconActive: UsersIconActive,
  },
  {
    name: "Mis casos",
    href: APP_PATHS.CASES,
    iconInactive: FolderIcon,
    iconActive: FolderIconActive,
  },
  {
    name: "Calendario",
    href: APP_PATHS.CALENDAR,
    iconInactive: CalendarIcon,
    iconActive: CalendarIconActive,
  },
  {
    name: "Mensajes",
    href: APP_PATHS.CHATS,
    iconInactive: ChatBubbleBottomCenterIcon,
    iconActive: ChatBubbleBottomCenterIconActive,
  },
  {
    name: "Articulos",
    href: APP_PATHS.ARTICLES,
    iconInactive: DocumentTextIcon,
    iconActive: DocumentTextIconActive,
  },
  {
    name: "Abogados",
    href: APP_PATHS.LAWYERS,
    iconInactive: BuildingLibraryIcon,
    iconActive: BuildingLibraryIconActive,
  },
  {
    name: "Comunidades",
    href: "#",
    iconInactive: CalendarIcon,
    iconActive: CalendarIconActive,
    children: [
      {
        name: "Crear comunidad",
        iconInactive: PlusIcon,
        iconActive: PlusIcon,
        action: () => {
          console.log("crear comunidad");
        },
      },
      {
        name: "Desarrollo legal",
        href: `${APP_PATHS.COMMUNITIES}/development-law`,
        image:
          "https://images.pexels.com/photos/5727885/pexels-photo-5727885.jpeg",
      },
      {
        name: "Derechos laborales",
        href: `${APP_PATHS.COMMUNITIES}/labor-law`,
        image:
          "https://images.pexels.com/photos/5648040/pexels-photo-5648040.jpeg",
      },
      {
        name: "Derechos de la familia",
        href: `${APP_PATHS.COMMUNITIES}/family-law`,
        image:
          "https://images.pexels.com/photos/5648040/pexels-photo-5648040.jpeg",
      },
    ],
  },
  {
    name: "Recursos",
    href: "#",
    iconInactive: CalendarIcon,
    iconActive: CalendarIconActive,

    children: [
      {
        name: "Acerca de Arxatec",
        href: "https://www.arxatec.net/es/",
        iconInactive: InformationCircleIcon,
        iconActive: InformationCircleIconActive,
      },
      {
        name: "Ayuda",
        href: "https://www.arxatec.net/es/support",
        iconInactive: QuestionMarkCircleIcon,
        iconActive: QuestionMarkCircleIconActive,
      },
      {
        name: "Comunidades",
        href: APP_PATHS.COMMUNITIES,
        iconInactive: GlobeAltIcon,
        iconActive: GlobeAltIconActive,
      },
      {
        name: "Nuestro blog",
        href: "https://www.arxatec.net/es/blog",
        iconInactive: PencilSquareIcon,
        iconActive: PencilSquareIconActive,
      },
      {
        name: "Planes de Arxatec",
        href: "https://www.arxatec.net/es/pricing",
        iconInactive: DocumentTextIcon,
        iconActive: DocumentTextIconActive,
      },
      {
        name: "Politica de privacidad",
        href: "https://www.arxatec.net/es/privacy",
        iconInactive: ShieldCheckIcon,
        iconActive: ShieldCheckIconActive,
      },
      {
        name: "Terminos y condiciones",
        href: "https://www.arxatec.net/es/terms",
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
          navigation={navigationTest}
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
