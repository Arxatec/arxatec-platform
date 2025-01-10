import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import { classNames } from "~/utilities/string_utilities";

interface Props {
  logo: string;
  navigation: {
    name: string;
    href: string;
    icon: React.ElementType;
  }[];
}

export const SidebarDesktop: React.FC<Props> = ({ navigation, logo }) => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <img alt="Your Company" src={logo} className="h-8 w-auto" />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.href === location.pathname
                          ? "bg-gray-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={classNames(
                          item.href === location.pathname
                            ? "text-blue-600"
                            : "text-gray-400 group-hover:text-blue-600",
                          "size-6 shrink-0"
                        )}
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="mt-auto">
              <a
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                <Cog6ToothIcon
                  aria-hidden="true"
                  className="size-6 shrink-0 text-gray-400 group-hover:text-blue-600"
                />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
