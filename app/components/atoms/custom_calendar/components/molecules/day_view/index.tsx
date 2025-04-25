import type React from "react";

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

type DayViewProps = {
  currentDate: Date;
  selectedDate: Date;
  onSelect: (date: Date) => void;
};

export const DayView: React.FC<DayViewProps> = ({
  currentDate,
  selectedDate,
  onSelect,
}) => {
  const today = new Date();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const firstDayOfWeek = firstDayOfMonth.getDay();

  const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const daysInPrevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();

  const days = [];

  for (let i = 0; i < startDay; i++) {
    const day = daysInPrevMonth - startDay + i + 1;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      day
    );
    days.push({ day, date, isCurrentMonth: false });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    days.push({ day: i, date, isCurrentMonth: true });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      i
    );
    days.push({ day: i, date, isCurrentMonth: false });
  }

  const weekDays = ["L", "M", "X", "J", "V", "S", "D"];

  return (
    <div className="p-2">
      <div className="mb-2 grid grid-cols-7 text-center">
        {weekDays.map((day, index) => (
          <div key={index} className="text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map(({ day, date, isCurrentMonth }, index) => (
          <button
            key={index}
            onClick={() => onSelect(date)}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
              isSameDay(date, selectedDate)
                ? "bg-blue-100 text-blue-600"
                : isCurrentMonth
                ? "text-gray-700 hover:bg-gray-100"
                : "text-gray-400 hover:bg-gray-50"
            } ${
              isSameDay(date, today) && !isSameDay(date, selectedDate)
                ? "font-bold"
                : ""
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
