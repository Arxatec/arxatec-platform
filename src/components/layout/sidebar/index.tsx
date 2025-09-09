import { ChevronsUpDown, Home, LogOut } from "lucide-react";
import { Outlet } from "react-router-dom";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

const items = [
  {
    title: "Mis casos",
    url: "#",
    icon: Home,
  },
];

export default function Sidebar() {
  return (
    <SidebarProvider>
      <SidebarComponent>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
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
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>JP</AvatarFallback>
                        </Avatar>
                        <div className="text-xs">
                          <p>Juan Perez</p>
                          <p className="text-secondary-foreground">
                            juan.perez@gmail.com
                          </p>
                        </div>
                      </div>
                      <ChevronsUpDown className="size-4" />
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[245px]" side="top">
                  <DropdownMenuItem>
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
