import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  BookOpenIcon,
  CalendarDaysIcon,
  DocumentIcon,
  DocumentPlusIcon,
  FolderIcon,
  FolderPlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

const projects = [
  { id: 1, name: "Caso de violencia", url: "#" },
  { id: 2, name: "Caso de abuso", url: "#" },
  { id: 3, name: "Caso de acoso", url: "#" },
  { id: 4, name: "Caso de discriminación", url: "#" },
  { id: 5, name: "Caso de discapacidad", url: "#" },
  { id: 6, name: "Caso de lesiones", url: "#" },
  { id: 7, name: "Caso de bienes y servicios", url: "#" },
];
const recent = [projects[0], projects[1], projects[2], projects[3]];
const quickActions = [
  { name: "Mis casos", icon: DocumentIcon, shortcut: "C", url: "#" },
  { name: "Mis clientes", icon: UserGroupIcon, shortcut: "U", url: "#" },
  {
    name: "Agregar publicación",
    icon: DocumentPlusIcon,
    shortcut: "N",
    url: "#",
  },
  { name: "Agregar evento", icon: CalendarDaysIcon, shortcut: "F", url: "#" },
  { name: "Agregar caso", icon: FolderPlusIcon, shortcut: "H", url: "#" },
  { name: "Agregar articulo", icon: BookOpenIcon, shortcut: "L", url: "#" },
];

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const CommandPalettes: React.FC<Props> = ({ open, setOpen }) => {
  const [query, setQuery] = useState("");

  const filteredProjects =
    query === ""
      ? []
      : projects.filter((project) => {
          return project.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Dialog
      className="relative z-[60]"
      open={open}
      onClose={() => {
        setOpen(false);
        setQuery("");
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-950/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <Combobox
            onChange={(item) => {
              if (item) {
                // window.location = {};
              }
            }}
          >
            <div className="grid grid-cols-1">
              <ComboboxInput
                autoFocus
                className="col-start-1 row-start-1 h-12 w-full pl-11 pr-4 text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
                placeholder="Buscar..."
                onChange={(event) => setQuery(event.target.value)}
                onBlur={() => setQuery("")}
              />
              <MagnifyingGlassIcon
                className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
                aria-hidden="true"
              />
            </div>

            {(query === "" || filteredProjects.length > 0) && (
              <Scrollbars autoHeight autoHeightMax={320} height={320} autoHide>
                <ComboboxOptions
                  static
                  as="ul"
                  className=" h-full scroll-py-2 divide-y divide-gray-100 overflow-hidden"
                >
                  <li className="p-2">
                    {query === "" && (
                      <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-500">
                        Últimos casos
                      </h2>
                    )}
                    <ul className="text-sm text-gray-700">
                      {(query === "" ? recent : filteredProjects).map(
                        (project) => (
                          <ComboboxOption
                            as="li"
                            key={project.id}
                            value={project}
                            className="group flex cursor-default select-none items-center rounded-md px-3 py-2 data-[focus]:bg-blue-600 data-[focus]:text-white data-[focus]:outline-none"
                          >
                            <FolderIcon
                              className="size-5 flex-none text-gray-700 group-data-[focus]:text-white forced-colors:group-data-[focus]:text-[Highlight]"
                              aria-hidden="true"
                            />
                            <span className="ml-3 flex-auto truncate">
                              {project.name}
                            </span>
                            <span className="ml-3 hidden flex-none text-blue-100 group-data-[focus]:inline">
                              Ir a...
                            </span>
                          </ComboboxOption>
                        )
                      )}
                    </ul>
                  </li>
                  {query === "" && (
                    <li className="p-2">
                      <h2 className="sr-only">Quick actions</h2>
                      <ul className="text-sm text-gray-700">
                        {quickActions.map((action) => (
                          <ComboboxOption
                            as="li"
                            key={action.shortcut}
                            value={action}
                            className="group transition-all cursor-pointer flex select-none items-center rounded-md px-3 py-2 data-[focus]:bg-blue-600 data-[focus]:text-white data-[focus]:outline-none"
                          >
                            <action.icon
                              className="size-5 flex-none text-gray-700 group-data-[focus]:text-white forced-colors:group-data-[focus]:text-[Highlight]"
                              aria-hidden="true"
                            />
                            <span className="ml-3 flex-auto truncate">
                              {action.name}
                            </span>
                            <span className="ml-3 flex-none text-xs font-semibold text-gray-400 group-data-[focus]:text-blue-100">
                              <kbd className="font-sans">⌘</kbd>
                              <kbd className="font-sans">{action.shortcut}</kbd>
                            </span>
                          </ComboboxOption>
                        ))}
                      </ul>
                    </li>
                  )}
                </ComboboxOptions>
              </Scrollbars>
            )}

            {query !== "" && filteredProjects.length === 0 && (
              <div className="px-6 py-14 text-center sm:px-14 max-w-lg mx-auto">
                <FolderIcon
                  className="mx-auto size-6 text-gray-400"
                  aria-hidden="true"
                />
                <p className="mt-2 text-sm font-semibold text-gray-600">
                  No se encontraron casos{" "}
                </p>
                <p className="text-sm text-gray-500">
                  Intenta buscando en tus casos propios en la sección de casos
                  propios, o intenta con otro término.
                </p>
              </div>
            )}
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
