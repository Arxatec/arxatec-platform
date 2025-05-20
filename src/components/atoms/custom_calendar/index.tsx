import { useState, useRef, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { DayView, MonthView, YearView } from "./components/molecules";
import { CalendarIcon } from "@heroicons/react/24/solid";

export const formatDate = (date: Date, format: string): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return format.replace("dd", day).replace("MM", month).replace("yyyy", year);
};

type Props = {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  format?: string;
};

type View = "day" | "month" | "year";

export const CustomCalendar: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Seleccionar fecha",
  format = "dd/MM/yyyy",
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());
  const [currentDate, setCurrentDate] = useState<Date>(value || new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [view, setView] = useState<View>("day");
  const [animation, setAnimation] = useState<"" | "in" | "out">("");
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        closeCalendar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openCalendar = () => {
    setIsOpen(true);
    setAnimation("in");
  };

  const closeCalendar = () => {
    setAnimation("out");
    setTimeout(() => {
      setIsOpen(false);
      setAnimation("");
      setView("day");
    }, 300);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentDate(date);
    if (onChange) onChange(date);
    closeCalendar();
  };

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    setCurrentDate(newDate);
    changeView("day");
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    changeView("month");
  };

  const changeView = (newView: View) => {
    setAnimation("out");
    setTimeout(() => {
      setView(newView);
      setAnimation("in");
    }, 300);
  };

  const navigatePrev = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === "month") {
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else if (view === "year") {
      newDate.setFullYear(newDate.getFullYear() - 10);
    }
    setAnimation("out");
    setTimeout(() => {
      setCurrentDate(newDate);
      setAnimation("in");
    }, 300);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === "month") {
      newDate.setFullYear(newDate.getFullYear() + 1);
    } else if (view === "year") {
      newDate.setFullYear(newDate.getFullYear() + 10);
    }
    setAnimation("out");
    setTimeout(() => {
      setCurrentDate(newDate);
      setAnimation("in");
    }, 300);
  };

  const getHeaderTitle = () => {
    if (view === "day") {
      const year = currentDate.getFullYear();
      const month = currentDate.toLocaleString("es", { month: "long" });
      return `${year} ${month}`;
    } else if (view === "month") {
      return currentDate.getFullYear().toString();
    } else if (view === "year") {
      const decade = Math.floor(currentDate.getFullYear() / 10) * 10;
      return `${decade} - ${decade + 9}`;
    }
    return "";
  };

  return (
    <div className="relative w-full ">
      <input
        ref={inputRef}
        type="text"
        className="w-full rounded-md border border-gray-300 px-4 py-1.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm z-10"
        placeholder={placeholder}
        value={selectedDate ? formatDate(selectedDate, format) : ""}
        onClick={openCalendar}
        readOnly
      />
      <CalendarIcon className="size-5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 z-10" />
      <div className="w-full max-w-xs">
        {isOpen && (
          <div
            ref={calendarRef}
            className={`absolute mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg ${
              animation === "in"
                ? "animate-fadeIn"
                : animation === "out"
                ? "animate-fadeOut"
                : ""
            }`}
            style={{ zIndex: 10 }}
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-2">
              <button
                onClick={navigatePrev}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                onClick={() => {
                  if (view === "day") changeView("month");
                  else if (view === "month") changeView("year");
                }}
                className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                {getHeaderTitle()}
              </button>
              <button
                onClick={navigateNext}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
              >
                <ChevronRightIcon className="size-5" />
              </button>
            </div>

            <div
              className={`overflow-hidden ${
                animation === "in"
                  ? "animate-slideIn"
                  : animation === "out"
                  ? "animate-slideOut"
                  : ""
              }`}
            >
              {view === "day" && (
                <DayView
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  onSelect={handleDateSelect}
                />
              )}
              {view === "month" && (
                <MonthView
                  currentDate={currentDate}
                  onSelect={handleMonthSelect}
                />
              )}
              {view === "year" && (
                <YearView
                  currentDate={currentDate}
                  onSelect={handleYearSelect}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
