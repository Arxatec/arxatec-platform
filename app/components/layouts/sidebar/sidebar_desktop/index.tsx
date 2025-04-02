import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRightIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";
import { classNames } from "~/utilities/string_utilities";

interface Props {
  logo: string;
  navigation: {
    name: string;
    href: string;
    iconInactive: React.ElementType;
    iconActive: React.ElementType;
    children?: {
      name: string;
      href: string;
      current: boolean;
      image?: string;
      iconInactive?: React.ElementType;
      iconActive?: React.ElementType;
    }[];
  }[];
}

export const SidebarDesktop: React.FC<Props> = ({ navigation, logo }) => {
  const location = useLocation();
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col ">
      <div className="flex grow flex-col  overflow-y-auto  bg-white   ">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <img alt="Arxatec" src={logo} className="h-10 w-auto" />
        </div>
        <nav className="flex flex-1 flex-col px-6 border-r border-gray-200 pt-5">
          <ul role="list" className="flex flex-1 flex-col">
            <li>
              <ul role="list" className="-mx-2">
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
                            className={
                              "text-gray-600 group-hover:text-gray-700 size-6 shrink-0"
                            }
                          />
                        ) : (
                          <item.iconActive
                            aria-hidden="true"
                            className={
                              " group-hover:text-blue-600 size-6 shrink-0 text-blue-600"
                            }
                          />
                        )}
                        {item.name}
                      </Link>
                    ) : (
                      <Disclosure
                        as="div"
                        className="border-t border-gray-100 my-2 pt-2"
                      >
                        <DisclosureButton
                          className={classNames(
                            location.pathname.includes(item.href)
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-600 hover:bg-slate-50 hover:text-gray-700",
                            " flex gap-x-3 rounded-md p-2 text-xs tracking-widest font-semibold w-full group transition-all uppercase"
                          )}
                        >
                          {item.name}
                          <ChevronRightIcon
                            aria-hidden="true"
                            className="ml-auto transition-all size-5 shrink-0 text-gray-400 group-data-[open]:rotate-90 group-data-[open]:text-gray-500"
                          />
                        </DisclosureButton>
                        <DisclosurePanel as="ul" className="mt-1 px-1">
                          {item.children.map((subItem) => (
                            <li key={subItem.name}>
                              <DisclosureButton
                                as="a"
                                href={subItem.href}
                                className={classNames(
                                  subItem.current
                                    ? "bg-gray-50"
                                    : "hover:bg-gray-50",
                                  "flex items-center gap-x-2 rounded-md py-2 pl-4 pr-2 text-sm text-gray-700 hover:bg-slate-50"
                                )}
                              >
                                {subItem.image ? (
                                  <img
                                    src={subItem.image}
                                    alt="avatar"
                                    className="size-8 rounded-full"
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
                      </Disclosure>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
