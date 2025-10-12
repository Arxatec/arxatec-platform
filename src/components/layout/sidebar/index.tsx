import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronsUpDown,
  Folder,
  Home,
  LogOut,
  Telescope,
  Users,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Logo,
} from "@/components/ui";
import { useAuth } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { USER_TYPE } from "@/types";
import { toast } from "sonner";

const clientNavigation = [
  {
    title: "Mis casos",
    url: ROUTES.Client.ViewCases,
    icon: Home,
  },
  {
    title: "Abogados",
    url: ROUTES.Client.ViewLawyers,
    icon: BriefcaseIcon,
  },
  {
    title: "Calendario",
    url: ROUTES.Client.ViewCalendar,
    icon: CalendarIcon,
  },
];

const lawyerNavigation = [
  {
    title: "Mis casos",
    url: ROUTES.Lawyer.ViewCases,
    icon: Folder,
  },
  {
    title: "Explorar casos",
    url: ROUTES.Lawyer.ExplorerCases,
    icon: Telescope,
  },
  {
    title: "Mis clientes",
    url: ROUTES.Lawyer.ViewClients,
    icon: Users,
  },
];
export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = useLocation().pathname;

  /* const showSoonToast = () => {
    toast.info("Próximamente disponible", {
      description:
        "Actualmente estamos trabajando en esta funcionalidad, pronto estará disponible.",
    });
  }; */
  return (
    <SidebarProvider>
      <SidebarComponent>
        <SidebarHeader>
          <div className="py-2 px-4 flex items-center justify-center bg-accent rounded">
            <Logo className="w-24 h-8 text-primary" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {user?.user_type === USER_TYPE.LAWYER &&
                  lawyerNavigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                {user?.user_type === USER_TYPE.CLIENT &&
                  clientNavigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="py-5">
                    <div className="flex items-center gap-2 justify-between w-full">
                      <div className="flex items-center justify-start gap-2">
                        <Avatar>
                          <AvatarFallback>
                            {user?.name?.split(" ")[0].charAt(0)}
                            {user?.name?.split(" ")[1].charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-xs">
                          <p>{user?.name}</p>
                          <p className="text-secondary-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <ChevronsUpDown className="size-4" />
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[245px]" side="top">
                  <DropdownMenuItem onClick={logout}>
                    <LogOut />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarComponent>
      <SidebarInset>
        <div className="mx-auto w-full">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
