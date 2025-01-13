import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface MenuSection {
  items: MenuItem[];
}

export interface MenuProps {
  sections: MenuSection[];
  buttonLabel?: string;
  buttonIcon?: React.ReactNode;
  buttonClassName?: string;
  menuClassName?: string;
  menuItemClassName?: string;
  position?: "left" | "right";
  width?: string;
}

const defaultButtonClassName =
  "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";
const defaultMenuClassName =
  "absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none";
const defaultMenuItemClassName =
  "group flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none";

export const CustomDropdown: React.FC<MenuProps> = ({
  sections,
  buttonLabel,
  buttonIcon = <ChevronDownIcon className="w-5 h-5 text-gray-400 ml-2" />,
  buttonClassName = defaultButtonClassName,
  menuClassName = defaultMenuClassName,
  menuItemClassName = defaultMenuItemClassName,
  position = "right",
  width = "w-56",
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={buttonClassName}>
          {buttonLabel}
          {buttonIcon}
        </Menu.Button>
      </div>

      <Menu.Items
        className={`
          ${menuClassName}
          ${width}
          ${position === "left" ? "left-0" : "right-0"}
          transition
          data-[closed]:scale-95
          data-[closed]:transform
          data-[closed]:opacity-0
          data-[enter]:duration-100
          data-[leave]:duration-75
          data-[enter]:ease-out
          data-[leave]:ease-in
        `}
      >
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="py-1">
            {section.items.map((item) => (
              <Menu.Item key={item.id}>
                {({ active }) => {
                  const Component = item.href ? "a" : "button";
                  const props = item.href
                    ? { href: item.href }
                    : { onClick: item.onClick };

                  return (
                    <Component
                      {...props}
                      className={`${menuItemClassName} w-full `}
                    >
                      {item.icon && (
                        <span
                          className={`mr-2 text-gray-400 group-data-[focus]:text-gray-500`}
                        >
                          {item.icon}
                        </span>
                      )}
                      {item.label}
                    </Component>
                  );
                }}
              </Menu.Item>
            ))}
          </div>
        ))}
      </Menu.Items>
    </Menu>
  );
};
