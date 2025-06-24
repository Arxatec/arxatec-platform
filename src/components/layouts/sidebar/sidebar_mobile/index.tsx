import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { classNames } from "~/utilities/string_utilities";
import { CustomImage } from "~/components/atoms";
import { useEffect, useState } from "react";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  navigation: {
    name: string;
    href: string;
    iconInactive: React.ElementType;
    iconActive: React.ElementType;
    children?: {
      name: string;
      href?: string;
      image?: string;
      action?: () => void;
      iconInactive?: React.ElementType;
      iconActive?: React.ElementType;
    }[];
  }[];
  logo: string;
}

export const SidebarMobile: React.FC<Props> = ({
  sidebarOpen,
  setSidebarOpen,
  navigation,
  logo,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarExpandedState");

    if (savedState) {
      setExpandedItems(JSON.parse(savedState));
    } else {
      const initialState = navigation.reduce((acc, item) => {
        if (item.children) {
          acc[item.name] = true;
        }
        return acc;
      }, {} as Record<string, boolean>);
      setExpandedItems(initialState);
      localStorage.setItem(
        "sidebarExpandedState",
        JSON.stringify(initialState)
      );
    }
  }, []);

  const handleDisclosureChange = (name: string, isOpen: boolean) => {
    const newState = { ...expandedItems, [name]: isOpen };
    setExpandedItems(newState);
    localStorage.setItem("sidebarExpandedState", JSON.stringify(newState));
  };

  return (
    <Dialog
      open={sidebarOpen}
      onClose={setSidebarOpen}
      className="relative z-50 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex">
        <DialogPanel
          transition
          className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
        >
          <TransitionChild>
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="-m-2.5 p-2.5"
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon aria-hidden="true" className="size-6 text-white" />
              </button>
            </div>
          </TransitionChild>
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img alt="Arxatec" src={logo} className="h-8 w-auto" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        {!item.children ? (
                          <Link
                            to={item.href}
                            className={classNames(
                              location.pathname.includes(item.href)
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-600 hover:bg-slate-50 hover:text-gray-700",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold items-center"
                            )}
                          >
                            {!location.pathname.includes(item.href) ? (
                              <item.iconInactive
                                aria-hidden="true"
                                className="text-gray-600 group-hover:text-gray-700 size-6 shrink-0"
                              />
                            ) : (
                              <item.iconActive
                                aria-hidden="true"
                                className="group-hover:text-blue-600 size-6 shrink-0 text-blue-600"
                              />
                            )}
                            {item.name}
                          </Link>
                        ) : (
                          <Disclosure
                            as="div"
                            className="border-t border-gray-100 my-2 pt-2"
                            defaultOpen={true}
                          >
                            {({ open }) => {
                              if (
                                expandedItems[item.name] !== undefined &&
                                open !== expandedItems[item.name]
                              ) {
                                handleDisclosureChange(item.name, open);
                              }
                              return (
                                <>
                                  <DisclosureButton
                                    className={classNames(
                                      location.pathname.includes(item.href)
                                        ? "bg-blue-100 text-blue-600"
                                        : "text-gray-600 hover:bg-slate-50 hover:text-gray-700",
                                      "flex gap-x-3 rounded-md p-2 text-xs tracking-widest font-semibold w-full group transition-all uppercase"
                                    )}
                                  >
                                    {item.name}
                                    <ChevronRightIcon
                                      aria-hidden="true"
                                      className={classNames(
                                        "ml-auto transition-all size-5 shrink-0 text-gray-400",
                                        open ? "rotate-90" : ""
                                      )}
                                    />
                                  </DisclosureButton>
                                  <DisclosurePanel
                                    as="ul"
                                    className="mt-1 px-1"
                                  >
                                    {item.children.map((subItem) => (
                                      <li key={subItem.name}>
                                        <DisclosureButton
                                          onClick={(e) => {
                                            e.preventDefault();
                                            if (subItem.action !== undefined) {
                                              subItem.action();
                                              return;
                                            }

                                            if (subItem.href !== undefined) {
                                              if (
                                                subItem.href.includes("http")
                                              ) {
                                                window.open(
                                                  subItem.href,
                                                  "_blank"
                                                );
                                              } else {
                                                navigate(subItem.href);
                                              }
                                            }
                                            setSidebarOpen(false);
                                          }}
                                          className={classNames(
                                            "flex items-center gap-x-2 rounded-md py-2 pl-4 pr-2 text-sm text-gray-700 hover:bg-slate-50 w-full"
                                          )}
                                        >
                                          {subItem.image ? (
                                            <CustomImage
                                              src={subItem.image}
                                              alt="avatar"
                                              className="size-8 rounded-md overflow-hidden"
                                            />
                                          ) : null}
                                          {subItem.iconInactive ? (
                                            <subItem.iconInactive
                                              aria-hidden="true"
                                              className="size-6 shrink-0 text-gray-600"
                                            />
                                          ) : null}
                                          {subItem.name}
                                        </DisclosureButton>
                                      </li>
                                    ))}
                                  </DisclosurePanel>
                                </>
                              );
                            }}
                          </Disclosure>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
