import { useState } from "react";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Listbox } from "@headlessui/react";
import { TimeSelect } from "../time_select";

type Day = {
  id: string;
  name: string;
  selected: boolean;
  startTime: string;
  endTime: string;
};

export const TimeSelector = () => {
  const [days, setDays] = useState<Day[]>([
    {
      id: "mon",
      name: "Lunes",
      selected: true,
      startTime: "12:00 a.m",
      endTime: "12:00 a.m",
    },
    {
      id: "tue",
      name: "Martes",
      selected: false,
      startTime: "12:00 a.m",
      endTime: "12:00 a.m",
    },
    {
      id: "wed",
      name: "Miercoles",
      selected: true,
      startTime: "12:00 a.m",
      endTime: "12:00 a.m",
    },
    {
      id: "thu",
      name: "Jueves",
      selected: false,
      startTime: "12:00 a.m",
      endTime: "12:00 a.m",
    },
    {
      id: "fri",
      name: "Viernes",
      selected: false,
      startTime: "12:00 a.m",
      endTime: "12:00 a.m",
    },
    {
      id: "sat",
      name: "Sabado",
      selected: false,
      startTime: "12:00 a.m",
      endTime: "12:00 a.m",
    },
    {
      id: "sun",
      name: "Domingo",
      selected: false,
      startTime: "12:00 a.m",
      endTime: "12:00 a.m",
    },
  ]);

  const timeOptions = [
    "12:00 a.m",
    "1:00 a.m",
    "2:00 a.m",
    "3:00 a.m",
    "4:00 a.m",
    "5:00 a.m",
    "6:00 a.m",
    "7:00 a.m",
    "8:00 a.m",
    "9:00 a.m",
    "10:00 a.m",
    "11:00 a.m",
    "12:00 p.m",
    "1:00 p.m",
    "2:00 p.m",
    "3:00 p.m",
    "4:00 p.m",
    "5:00 p.m",
    "6:00 p.m",
    "7:00 p.m",
    "8:00 p.m",
    "9:00 p.m",
    "10:00 p.m",
    "11:00 p.m",
  ];

  const toggleDaySelection = (dayId: string) => {
    setDays(
      days.map((day) =>
        day.id === dayId ? { ...day, selected: !day.selected } : day
      )
    );
  };

  const updateTime = (
    dayId: string,
    timeType: "startTime" | "endTime",
    value: string
  ) => {
    setDays(
      days.map((day) =>
        day.id === dayId ? { ...day, [timeType]: value } : day
      )
    );
  };

  return (
    <div className=" rounded-lg">
      <div className="space-y-3 w-full ">
        {days.map((day) => (
          <div key={day.id} className="flex items-center space-x-4">
            <div
              className="flex items-center justify-center w-6 h-6 rounded cursor-pointer"
              onClick={() => toggleDaySelection(day.id)}
            >
              <div
                className={`size-4 rounded ${
                  day.selected ? "bg-blue-600" : "border border-gray-400"
                } flex items-center justify-center`}
              >
                {day.selected && (
                  <CheckIcon className="size-3 text-white" strokeWidth={3} />
                )}
              </div>
            </div>

            <p className=" w-16 text-gray-600 text-sm truncate block">
              {day.name}
            </p>

            <TimeSelect
              value={day.startTime}
              options={timeOptions}
              onChange={(value) => updateTime(day.id, "startTime", value)}
            />

            <TimeSelect
              value={day.endTime}
              options={timeOptions}
              onChange={(value) => updateTime(day.id, "endTime", value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
