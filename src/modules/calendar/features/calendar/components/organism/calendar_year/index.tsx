import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import Scrollbars from "react-custom-scrollbars-2";
import { classNames } from "~/utilities/string_utilities";

function generateCalendar(year: number) {
  const months = [];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date().toISOString().split("T")[0];

  for (let month = 0; month < 12; month++) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Días del mes anterior
    const prevMonthDays = firstDay.getDay();
    for (let i = prevMonthDays; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      days.push({ date: date.toISOString().split("T")[0] });
    }

    // Días del mes actual
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day).toISOString().split("T")[0];
      days.push({
        date,
        isCurrentMonth: true,
        ...(date === today ? { isToday: true } : {}),
      });
    }

    // Días del siguiente mes
    const remainingDays = 42 - days.length; // Asegura una cuadrícula de 6 semanas (42 días)
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date: date.toISOString().split("T")[0] });
    }

    months.push({ name: monthNames[month], days });
  }

  return months;
}

const months = generateCalendar(2025);

export const CalendarYear = () => {
  return (
    <div className="h-full flex w-full  flex-col">
      <div className="">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-2 gap-y-2  sm:grid-cols-2 xl:max-w-none xl:grid-cols-3  2xl:grid-cols-4 h-full">
          {months.map((month) => (
            <section
              key={month.name}
              className="text-center bg-white overflow-hidden rounded-lg pt-2 shadow-sm hover:shadow-md transition-all"
            >
              <h2 className="text-sm font-semibold text-gray-900">
                {month.name}
              </h2>
              <div className="mt-2 grid grid-cols-7 text-xs/6 text-gray-500">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
              </div>
              <div className="isolate grid grid-cols-7 gap-px  bg-gray-200 text-sm shadow border-t border-gray-100">
                {month.days.map((day, dayIdx) => (
                  <button
                    key={day.date}
                    type="button"
                    className={classNames(
                      day.isCurrentMonth === true
                        ? "bg-white text-gray-900"
                        : "bg-gray-50 text-gray-300",

                      "py-1.5 hover:bg-gray-100 focus:z-10 transition-all"
                    )}
                  >
                    <time
                      dateTime={day.date}
                      className={classNames(
                        day.isToday
                          ? "bg-blue-600 font-semibold text-white"
                          : "",
                        "mx-auto flex size-7 items-center justify-center rounded-full"
                      )}
                    >
                      {day.date.split("-").pop()!.replace(/^0/, "")}
                    </time>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
