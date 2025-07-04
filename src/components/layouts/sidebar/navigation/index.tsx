import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type React from "react";
import { CommandPalettes } from "../command_palettes";
import { useState } from "react";
import { NotificationDrawer } from "~/components/molecules";
import { CustomAvatar, CustomInput } from "~/components/atoms";
import { useUserStore } from "~/store";
import { getFirstTwoWords } from "~/utilities/string_utilities";
import { logo } from "~/utilities/assets_utilities";

interface Props {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  setSidebarOpen: (value: boolean) => void;
}
export const Navigation: React.FC<Props> = ({
  expanded,
  setSidebarOpen,
  setExpanded,
}) => {
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const { user, setUser } = useUserStore();
  const userNavigation = [
    {
      name: "Cerrar sesión",
      icon: ArrowLeftEndOnRectangleIcon,
      action: () => {
        setUser(null);
        window.localStorage.removeItem("TOKEN_AUTH");
        window.location.reload();
      },
    },
  ];
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4  sm:gap-x-6 sm:px-6 lg:px-8">
      <NotificationDrawer
        open={openNotification}
        setOpen={setOpenNotification}
      />
      <CommandPalettes open={open} setOpen={setOpen} />
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="size-6" />
      </button>
      <button
        className={`hidden ${!expanded ? "lg:flex" : "hidden"} `}
        onClick={() => setExpanded(!expanded)}
      >
        <img className="w-36" src={logo} alt="logo" />
      </button>

      <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

      <div className="flex items-center justify-between gap-x-4 w-full lg:gap-x-6">
        <div></div>
        <div className="relative w-full max-w-lg "></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <CustomAvatar
                avatar={user?.avatar ?? ""}
                size="2.5rem"
                username={user?.name}
              />
              <span className="hidden lg:flex lg:items-center">
                <div className="ml-4 flex flex-col justify-start items-start">
                  <p className="text-sm font-semibold text-gray-900">
                    {getFirstTwoWords(user?.name ?? "")}
                  </p>
                  <p className="text-sm font-base text-gray-500">
                    {user?.userType === "lawyer"
                      ? "Abogado"
                      : user?.userType === "client"
                      ? "Cliente"
                      : "Administrador"}
                  </p>
                </div>
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute -left-14 z-10 mt-4 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {userNavigation.map((item) => (
                <MenuItem key={item.name}>
                  <button
                    onClick={() => item.action()}
                    className="flex gap-2 items-center w-full px-3 py-1 text-left text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                  >
                    <item.icon className="size-4 text-gray-700" />
                    {item.name}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};
