import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getMonthName } from "~/utilities/date_utilities";
import { classNames } from "~/utilities/string_utilities";

function generateCalendarJson(
  year: number,
  month: number
): {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
}[] {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  let days: {
    date: string;
    isCurrentMonth?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
  }[] = [];

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    let prevDate = new Date(year, month - 1, -i);
    days.push({ date: prevDate.toISOString().split("T")[0] });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    let date = new Date(year, month - 1, i);
    let dayObject: {
      date: string;
      isCurrentMonth?: boolean;
      isToday?: boolean;
      isSelected?: boolean;
    } = {
      date: date.toISOString().split("T")[0],
      isCurrentMonth: true,
    };

    let today = new Date();
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      dayObject.isToday = true;
    }

    if (i === 15) {
      dayObject.isSelected = true;
    }

    days.push(dayObject);
  }

  let remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    let nextDate = new Date(year, month - 1, daysInMonth + i);
    days.push({ date: nextDate.toISOString().split("T")[0] });
  }

  return days;
}
const month = getMonthName(new Date().getMonth() + 1);
const year = new Date().getFullYear();
const days = generateCalendarJson(2025, 3);

export const Calendar = () => {
  return (
    <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block bg-white shadow-sm rounded-lg hover:shadow-md">
      <div className="flex items-center text-center text-gray-900">
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="size-5" aria-hidden="true" />
        </button>
        <div className="flex-auto text-sm font-semibold">
          {month} {year}
        </div>
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-center text-xs/6 text-gray-500">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {days.map((day, dayIdx) => (
          <button
            key={day.date}
            type="button"
            className={classNames(
              "py-1.5 hover:bg-gray-100 focus:z-10",
              day.isCurrentMonth ? "bg-white" : "bg-gray-50",
              day.isSelected == true || day.isToday == true
                ? "font-semibold"
                : "font-base",
              day.isSelected == true ? "text-white" : "",
              day.isSelected == false &&
                day.isCurrentMonth == true &&
                day.isToday == false
                ? "text-gray-900"
                : "",
              day.isSelected == false &&
                day.isCurrentMonth == false &&
                day.isToday == false
                ? "text-gray-400"
                : "",
              day.isToday == true && day.isSelected == false
                ? "text-blue-600"
                : "",
              dayIdx === 0 ? "rounded-tl-lg" : "",
              dayIdx === 6 ? "rounded-tr-lg" : "",
              dayIdx === days.length - 7 ? "rounded-bl-lg" : "",
              dayIdx === days.length - 1 ? "rounded-br-lg" : ""
            )}
          >
            <time
              dateTime={day.date}
              className={classNames(
                "mx-auto flex size-7 items-center justify-center rounded-full",
                day.isSelected == true && day.isToday == true
                  ? "bg-blue-600"
                  : "",
                day.isSelected == true && day.isToday == false
                  ? "bg-gray-900"
                  : ""
              )}
            >
              {day.date.split("-").pop()!.replace(/^0/, "")}
            </time>
          </button>
        ))}
      </div>
    </div>
  );
};
