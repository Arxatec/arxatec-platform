"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { UsersIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CustomAvatar, PrimaryButton } from "~/components/atoms";
import { classNames } from "~/utilities/string_utilities";
import { useClientsStore } from "../../../store/clients.store";
import type { Client } from "../../../store/clients.store";
import { CreateClientModal } from "../create_client_modal";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelect: (user: { id: number; name: string; avatar: string }) => void;
}

export const SelectUser: React.FC<Props> = ({ open, setOpen, onSelect }) => {
  const [query, setQuery] = useState<string>("");
  const [selectedPerson, setSelectedPerson] = useState<Client | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const clients = useClientsStore((state) => state.clients);

  const filteredPeople: Client[] =
    query === ""
      ? []
      : clients.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleClose = () => {
    setOpen(false);
    setQuery("");
    setSelectedPerson(null);
  };

  const handleSelect = (person: Client) => {
    onSelect({
      id: person.id,
      name: person.name,
      avatar: person.imageUrl,
    });
    handleClose();
  };

  const handleClientCreated = (client: Client) => {
    handleSelect(client);
  };

  return (
    <>
      <Dialog className="relative z-50" open={open} onClose={handleClose}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-950/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <DialogPanel
            transition
            className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          >
            <Combobox<Client>
              value={selectedPerson}
              onChange={setSelectedPerson}
            >
              {({ activeOption }) => (
                <>
                  <div className="grid grid-cols-1">
                    <ComboboxInput
                      autoFocus
                      className="col-start-1 outline-none row-start-1 h-12 w-full pr-4 pl-11 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm"
                      placeholder="Buscar cliente..."
                      onChange={(event) => setQuery(event.target.value)}
                      onBlur={() => setQuery("")}
                    />
                    <MagnifyingGlassIcon
                      className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
                      aria-hidden="true"
                    />
                  </div>

                  {(query === "" || filteredPeople.length > 0) && (
                    <ComboboxOptions
                      as="div"
                      static
                      hold
                      className="flex transform-gpu divide-x divide-gray-100"
                    >
                      <div
                        className={classNames(
                          "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                          activeOption ? "sm:h-96" : ""
                        )}
                      >
                        <div className="flex justify-between items-center mb-4">
                          {query === "" && (
                            <h2 className="text-xs font-semibold text-gray-500">
                              Clientes recientes
                            </h2>
                          )}
                          <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <UserPlusIcon className="size-4" />
                            Crear cliente
                          </button>
                        </div>
                        <div className="-mx-2 text-sm text-gray-700">
                          {(query === ""
                            ? clients.slice(0, 3)
                            : filteredPeople
                          ).map((person) => (
                            <ComboboxOption
                              key={person.id}
                              value={person}
                              className="group flex cursor-pointer hover:bg-gray-100 transition-all items-center rounded-md p-2 select-none data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                              <CustomAvatar
                                avatar={person.imageUrl}
                                size="1.5rem"
                                altText={person.name}
                                username={person.name}
                              />
                              <span className="ml-3 flex-auto truncate">
                                {person.name}
                              </span>
                              <ChevronRightIcon
                                className="ml-3 hidden size-5 flex-none text-gray-400 group-data-focus:block"
                                aria-hidden="true"
                              />
                            </ComboboxOption>
                          ))}
                        </div>
                      </div>

                      {activeOption && (
                        <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                          <div className="flex-none p-6 text-center">
                            <CustomAvatar
                              avatar={activeOption.imageUrl}
                              size="4rem"
                              altText={activeOption.name}
                              username={activeOption.name}
                            />
                            <h2 className="mt-2 font-semibold text-gray-900">
                              {activeOption.name}
                            </h2>
                          </div>
                          <div className="flex flex-auto flex-col justify-between p-6">
                            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                              <dt className="col-end-1 font-semibold text-gray-900">
                                Celular
                              </dt>
                              <dd>{activeOption.phone}</dd>
                              <dt className="col-end-1 font-semibold text-gray-900">
                                Email
                              </dt>
                              <dd className="truncate">{activeOption.email}</dd>
                              <dt className="col-end-1 font-semibold text-gray-900">
                                Dirección
                              </dt>
                              <dd className="truncate">{activeOption.url}</dd>
                            </dl>
                            <PrimaryButton
                              onClick={() => handleSelect(activeOption)}
                            >
                              Seleccionar cliente
                            </PrimaryButton>
                          </div>
                        </div>
                      )}
                    </ComboboxOptions>
                  )}

                  {query !== "" && filteredPeople.length === 0 && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                      <UsersIcon
                        className="mx-auto size-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-2 text-sm font-semibold text-gray-600">
                        No se encontraron clientes
                      </p>
                      <p className="text-sm text-gray-500">
                        Intenta buscando en tus clientes propios, o intenta con
                        otro término.
                      </p>
                    </div>
                  )}
                </>
              )}
            </Combobox>
          </DialogPanel>
        </div>
      </Dialog>

      <CreateClientModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onClientCreated={handleClientCreated}
      />
    </>
  );
};
