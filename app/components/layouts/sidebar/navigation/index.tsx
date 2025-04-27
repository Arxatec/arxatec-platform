import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import type React from "react";
import { CommandPalettes } from "../command_palettes";
import { useState } from "react";
import { NotificationDrawer } from "~/components/molecules";
import {
  BookOpenIcon,
  CalendarDaysIcon,
  DocumentIcon,
  FolderIcon,
} from "@heroicons/react/24/solid";
import { CustomInput } from "~/components/atoms";

const userNavigation = [
  { name: "Perfil", href: "#", icon: UserIcon },
  { name: "Configuración", href: "#", icon: Cog6ToothIcon },
  { name: "Cerrar sesión", href: "#", icon: ArrowLeftEndOnRectangleIcon },
];

interface Props {
  setSidebarOpen: (value: boolean) => void;
}
export const Navigation: React.FC<Props> = ({ setSidebarOpen }) => {
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const toggleOpen = () => setOpen(!open);
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

      {/* Separator */}
      <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

      <div className="flex items-center justify-between gap-x-4 w-full lg:gap-x-6">
        <div></div>
        <div className="relative w-full max-w-lg ">
          <CustomInput
            placeholder="Buscar..."
            className="w-full"
            onClick={toggleOpen}
            startAdornment={
              <MagnifyingGlassIcon className="size-4 text-gray-400" />
            }
          />
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="flex items-center justify-start gap-4">
            <Menu as="div" className="relative">
              <MenuButton className=" rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition-all">
                <PlusIcon className="size-5 text-gray-700" strokeWidth={2.5} />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2.5 w-44 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <button className="flex gap-2 items-center w-full px-3 py-1 text-left text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none">
                    <DocumentIcon className="size-4 text-gray-700" />
                    Crear publicación
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="flex gap-2 items-center w-full px-3 py-1 text-left text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none">
                    <CalendarDaysIcon className="size-4 text-gray-700" />
                    Crear evento
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="flex gap-2 items-center w-full px-3 py-1 text-left text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none">
                    <FolderIcon className="size-4 text-gray-700" />
                    Crear caso
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="flex gap-2 items-center w-full px-3 py-1 text-left text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none">
                    <BookOpenIcon className="size-4 text-gray-700" />
                    Crear articulo
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>

            <button
              className=" rounded-full p-2 bg-gray-100"
              onClick={() => setOpenNotification(!openNotification)}
            >
              <BellIcon className="size-5 text-gray-700" />
            </button>

            <div
              aria-hidden="true"
              className="hidden lg:block lg:h-10 lg:w-px lg:bg-gray-200"
            />
          </div>

          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-10 rounded-md object-cover bg-gray-50"
              />
              <span className="hidden lg:flex lg:items-center">
                <div className="ml-4 flex flex-col justify-start items-start">
                  <p className="text-sm font-semibold text-gray-900">
                    Rafael Aguirre
                  </p>
                  <p className="text-sm font-base text-gray-500">Abogado</p>
                </div>
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {userNavigation.map((item) => (
                <MenuItem key={item.name}>
                  <a
                    href={item.href}
                    className="flex gap-2 items-center w-full px-3 py-1 text-left text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                  >
                    <item.icon className="size-4 text-gray-700" />
                    {item.name}
                  </a>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};
