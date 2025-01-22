import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellAlertIcon, BellIcon } from "@heroicons/react/16/solid";
import { InboxArrowDownIcon } from "@heroicons/react/20/solid";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import type React from "react";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

interface Props {
  setSidebarOpen: (value: boolean) => void;
}
export const Navigation: React.FC<Props> = ({ setSidebarOpen }) => {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4  sm:gap-x-6 sm:px-6 lg:px-8">
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
        <div className="relative bg-white border px-4 py-2 overflow-hidden  rounded-md w-full max-w-lg ">
          <input
            name="search"
            type="search"
            placeholder="Buscar..."
            aria-label="Search"
            className="flex rounded-md pl-4 w-full text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6  bg-transparent"
          />
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none absolute size-4 self-center text-gray-400 top-0 bottom-0 left-2 m-auto"
          />
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="flex items-center justify-start gap-4">
            <button className=" rounded-full p-2 bg-gray-100">
              <PlusIcon className="size-5 text-gray-700" strokeWidth={2.5} />
            </button>
            <button className=" rounded-full p-2 bg-gray-100">
              <BellIcon className="size-5 text-gray-700" />
            </button>
            <button className=" rounded-full p-2 bg-gray-100">
              <InboxArrowDownIcon className="size-5 text-gray-700" />
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
                  <p className="text-base font-semibold text-gray-900">
                    Rafael Aguirre
                  </p>
                  <p className="text-sm font-base text-gray-500">Abogado</p>
                </div>
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {userNavigation.map((item) => (
                <MenuItem key={item.name}>
                  <a
                    href={item.href}
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                  >
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
