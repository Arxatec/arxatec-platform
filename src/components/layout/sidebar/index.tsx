import {
  ChevronsUpDown,
  Folder,
  Home,
  LogOut,
  Telescope,
  Users,
} from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

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
} from "@/components/ui";
import { useAuth } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { USER_TYPE } from "@/types";

const clientNavigation = [
  {
    title: "Mis casos",
    url: ROUTES.Client.ViewCases,
    icon: Home,
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
  return (
    <SidebarProvider>
      <SidebarComponent>
        <SidebarHeader>
          <div className="py-2 px-4 flex items-center justify-center bg-accent rounded">
            <img src="/logo.png" alt="logo" className="w-20" />
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
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
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
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
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
        <div className="mx-auto max-w-5xl w-full px-12 py-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
