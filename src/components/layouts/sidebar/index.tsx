import { useState } from "react";
import {
  CalendarIcon,
  FolderIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarIcon as CalendarIconActive,
  FolderIcon as FolderIconActive,
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
import { Outlet } from "react-router-dom";

const navigationTest = [
  {
    name: "Mis casos",
    href: ROUTES.Lawyer.Cases,
    iconInactive: FolderIcon,
    iconActive: FolderIconActive,
  },
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
      {
        name: "Nuestro blog",
        href: ROUTES.Public.Articles,
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

export default function Sidebar() {
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
            <div className="h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
