import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { calendars } from "../../../types";
import { CustomSelector, PrimaryButton } from "~/components/atoms";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getDayName, getMonthName } from "~/utilities/date_utilities";

const viewCalendars = [
  { name: "Día", id: calendars.DAY },
  { name: "Semana", id: calendars.WEEK },
  { name: "Mes", id: calendars.MONTH },
  { name: "Año", id: calendars.YEAR },
];
const year = new Date().getFullYear();
const month = getMonthName(new Date().getMonth() + 1);
const day = new Date().getDate();
const dayName = getDayName(new Date().getDay());

interface Props {
  changeCalendar: (newCalendar: calendars) => void;
}
export const HeaderCalendar: React.FC<Props> = ({ changeCalendar }) => {
  const [selected, setSelected] = useState(viewCalendars[0]);

  const handleChangeCalendar = (select: { name: string; id: calendars }) => {
    changeCalendar(select.id);
    setSelected(select);
  };

  return (
    <header className="flex flex-none items-center justify-between px-6 py-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
      <div>
        <h1 className="text-base font-semibold text-gray-900">
          <time dateTime="2022-01-22" className="sm:hidden">
            {month} {day}, {year}
          </time>
          <time dateTime="2022-01-22" className="hidden sm:inline">
            {month} {day}, {year}
          </time>
        </h1>
        <p className="mt-1 text-sm text-gray-500">{dayName}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch ">
          <button
            type="button"
            className="flex items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative px-2 md:pr-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous day</span>
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hidden border-y border-gray-300 px-3.5  text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block py-[6px]"
          >
            Today
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            className="flex items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:pl-0 px-2 md:hover:bg-gray-50"
          >
            <span className="sr-only">Next day</span>
            <ChevronRightIcon className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:flex items-center  justify-center">
          <CustomSelector
            options={viewCalendars}
            selected={selected}
            onChange={handleChangeCalendar}
            buttonWidth="w-[100px]"
          />

          <div className="ml-6 h-6 w-px bg-gray-300" />
          <PrimaryButton className="ml-6 rounded-md bg-blue-600 flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <PlusIcon className="size-5 text-white" />
            Añadir evento
          </PrimaryButton>
        </div>
      </div>
    </header>
  );
};
