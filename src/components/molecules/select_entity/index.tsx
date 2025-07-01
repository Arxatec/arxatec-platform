// components/molecules/SelectEntity.tsx
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
import { UsersIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CustomAvatar, PrimaryButton } from "~/components/atoms";
import { classNames } from "~/utilities/string_utilities";

export interface SelectEntityProps<T> {
  open: boolean;
  setOpen: (open: boolean) => void;
  items: T[];
  onSelect: (item: T) => void;

  /** Obtiene el id único (para key, value) */
  getId: (item: T) => string;
  /** Obtiene el texto principal (para mostrar en lista) */
  getLabel: (item: T) => string;
  /** Opcional: obtiene la URL del avatar */
  getAvatar?: (item: T) => string;
  /** Opcional: filtra según query; por defecto compara getLabel en lowercase */
  filterFn?: (item: T, query: string) => boolean;
  /** Opcional: renderiza el panel de detalles */
  renderDetails?: (item: T) => React.ReactNode;
  /** Placeholder del input */
  placeholder?: string;
  /** Texto del botón de seleccionar */
  buttonLabel?: string;
}

export const SelectEntity = <T,>({
  open,
  setOpen,
  items,
  onSelect,
  getId,
  getLabel,
  getAvatar,
  filterFn,
  renderDetails,
  placeholder = "Buscar…",
  buttonLabel = "Seleccionar",
}: SelectEntityProps<T>) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<T | null>(null);

  const filteredItems = query
    ? items.filter((item) =>
        filterFn
          ? filterFn(item, query)
          : getLabel(item).toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleClose = () => {
    setOpen(false);
    setQuery("");
    setSelected(null);
  };

  const handleSelect = (item: T) => {
    onSelect(item);
    handleClose();
  };

  return (
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
          <Combobox<T> value={selected} onChange={setSelected}>
            {({ activeOption }) => (
              <>
                {/* Input + Icon */}
                <div className="grid grid-cols-1">
                  <ComboboxInput
                    autoFocus
                    className="col-start-1 outline-none row-start-1 h-12 w-full pr-4 pl-11 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm"
                    placeholder={placeholder}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => setQuery("")}
                  />
                  <MagnifyingGlassIcon
                    className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
                    aria-hidden="true"
                  />
                </div>

                {/* Opciones */}
                {(query === "" || filteredItems.length > 0) && (
                  <ComboboxOptions
                    as="div"
                    static
                    hold
                    className="flex transform-gpu divide-x divide-gray-100"
                  >
                    {/* Lista */}
                    <div
                      className={classNames(
                        "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                        activeOption ? "sm:h-96" : ""
                      )}
                    >
                      {query === "" && (
                        <h2 className="mt-2 mb-2 text-xs font-semibold text-gray-500">
                          Recientes
                        </h2>
                      )}
                      <div className="-mx-2 text-sm text-gray-700">
                        {(query === "" ? items : filteredItems).map((item) => {
                          const id = getId(item);
                          const label = getLabel(item);
                          const avatar = getAvatar?.(item) ?? "";
                          return (
                            <ComboboxOption
                              key={id}
                              value={item}
                              className="group flex cursor-pointer hover:bg-gray-100 transition-all items-center rounded-md p-2 select-none data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                              <CustomAvatar
                                avatar={avatar ?? ""}
                                size="1.5rem"
                                altText={label}
                                username={label}
                              />
                              <span className="ml-3 flex-auto truncate">
                                {label}
                              </span>
                              <ChevronRightIcon
                                className="ml-3 hidden size-5 flex-none text-gray-400 group-data-focus:block"
                                aria-hidden="true"
                              />
                            </ComboboxOption>
                          );
                        })}
                      </div>
                    </div>

                    {/* Panel de detalles */}
                    {activeOption && renderDetails && (
                      <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                        <div className="flex-none p-6 text-center">
                          {getAvatar && (
                            <CustomAvatar
                              avatar={getAvatar(activeOption)}
                              size="4rem"
                              altText={getLabel(activeOption)}
                              username={getLabel(activeOption)}
                            />
                          )}
                          <h2 className="mt-2 font-semibold text-gray-900">
                            {getLabel(activeOption)}
                          </h2>
                        </div>
                        <div className="flex flex-auto flex-col justify-between p-6">
                          {renderDetails(activeOption)}
                          <PrimaryButton
                            onClick={() => handleSelect(activeOption)}
                          >
                            {buttonLabel}
                          </PrimaryButton>
                        </div>
                      </div>
                    )}
                  </ComboboxOptions>
                )}

                {/* No resultados */}
                {query !== "" && filteredItems.length === 0 && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <UsersIcon
                      className="mx-auto size-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-sm font-semibold text-gray-600">
                      No se encontraron resultados
                    </p>
                    <p className="text-sm text-gray-500">
                      Intenta con otro término de búsqueda.
                    </p>
                  </div>
                )}
              </>
            )}
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
