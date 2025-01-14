import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import { Link, useLocation } from "react-router";
import { classNames } from "~/utilities/string_utilities";

interface Props {
  logo: string;
  navigation: {
    name: string;
    href: string;
    iconInactive: React.ElementType;
    iconActive: React.ElementType;
  }[];
}

export const SidebarDesktop: React.FC<Props> = ({ navigation, logo }) => {
  const location = useLocation();
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col ">
      {/* Sidebar component, swap this element with another sidebar if you like */}
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
                    <Link
                      to={item.href}
                      className={classNames(
                        location.pathname.includes(item.href)
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-600 hover:bg-slate-100 hover:text-gray-700",
                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
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
