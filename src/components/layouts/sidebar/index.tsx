import { useState } from "react";
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
import { ROUTES } from "~/routes/routes";

const navigationTest = [
  /*{
    name: "Dashboard",
    href: APP_PATHS.DASHBOARD,
    iconInactive: HomeIcon,
    iconActive: HomeIconActive,
  },*/
  {
    name: "Mis casos",
    href: ROUTES.AppRoutes.LawyerCases,
    iconInactive: FolderIcon,
    iconActive: FolderIconActive,
  },
  /*
  {
    name: "Mensajes",
    href: APP_PATHS.CHATS,
    iconInactive: ChatBubbleBottomCenterIcon,
    iconActive: ChatBubbleBottomCenterIconActive,
  },
  {
    name: "Calendario",
    href: APP_PATHS.CALENDAR,
    iconInactive: CalendarIcon,
    iconActive: CalendarIconActive,
  },
  {
    name: "Comunidad",
    href: APP_PATHS.POSTS,
    iconInactive: UsersIcon,
    iconActive: UsersIconActive,
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
        href: APP_PATHS.CREATE_COMMUNITY,
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
    }, */
  {
    name: "Recursos",
    href: "#",
    iconInactive: CalendarIcon,
    iconActive: CalendarIconActive,

    children: [
      {
        name: "Acerca de Arxatec",
        href: "https://www.arxatec.net/",
        iconInactive: InformationCircleIcon,
        iconActive: InformationCircleIconActive,
      },
      {
        name: "Ayuda",
        href: "https://www.arxatec.net/support",
        iconInactive: QuestionMarkCircleIcon,
        iconActive: QuestionMarkCircleIconActive,
      },
      /*
      {
        name: "Comunidades",
        href: APP_PATHS.COMMUNITIES,
        iconInactive: GlobeAltIcon,
        iconActive: GlobeAltIconActive,
        },*/
      {
        name: "Nuestro blog",
        href: ROUTES.AppRoutes.Articles,
        iconInactive: PencilSquareIcon,
        iconActive: PencilSquareIconActive,
      },
      {
        name: "Planes de Arxatec",
        href: "https://www.arxatec.net/pricing",
        iconInactive: DocumentTextIcon,
        iconActive: DocumentTextIconActive,
      },
      {
        name: "Politica de privacidad",
        href: "https://www.arxatec.net/privacy",
        iconInactive: ShieldCheckIcon,
        iconActive: ShieldCheckIconActive,
      },
      {
        name: "Terminos y condiciones",
        href: "https://www.arxatec.net/terms",
        iconInactive: DocumentDuplicateIcon,
        iconActive: DocumentDuplicateIconActive,
      },
    ],
  },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div>
        <SidebarMobile
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigationTest}
          logo={logo}
        />
        <SidebarDesktop
          navigation={navigationTest}
          setExpanded={setExpanded}
          expanded={expanded}
        />
        <div className={`${expanded ? "lg:pl-72" : ""} transition-all`}>
          <Navigation
            setSidebarOpen={setSidebarOpen}
            expanded={expanded}
            setExpanded={setExpanded}
          />
          <main className="bg-slate-100 py-4 lg:py-10 h-full">
            <div className="h-full">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
