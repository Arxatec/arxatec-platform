import { ChevronDownIcon } from "@heroicons/react/16/solid";
import type { JSX } from "react";
import { classNames } from "~/utilities/string_utilities";

interface Tab {
  name: string;
  component: JSX.Element;
}

interface Props {
  tabs: Tab[];
  selectedTab: Tab;
  setSelectedTab: React.Dispatch<React.SetStateAction<Tab>>;
}

export const Tabs: React.FC<Props> = ({
  tabs,
  selectedTab,
  setSelectedTab,
}) => {
  const handleTabChange = (tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:hidden">
        <select
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
      <div className="hidden sm:block">
        <nav aria-label="Tabs" className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              onClick={() => handleTabChange(tab)}
              key={tab.name}
              className={classNames(
                tab.name === selectedTab.name
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
