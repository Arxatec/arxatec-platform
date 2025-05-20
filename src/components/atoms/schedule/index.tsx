import { useState } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PlusIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CustomToggle } from "~/components/atoms";
import { TimeSelect } from "..";
import { LocaleKeys } from "~/lang";
import { useTranslation } from "react-i18next";

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  enabled: boolean;
  timeSlots: TimeSlot[];
}

interface ScheduleProps {
  onChange?: (schedule: Record<string, DaySchedule>) => void;
}

const DAY_OF_WEEK_TRANSLATIONS = [
  LocaleKeys.shared_day_of_week_monday,
  LocaleKeys.shared_day_of_week_tuesday,
  LocaleKeys.shared_day_of_week_wednesday,
  LocaleKeys.shared_day_of_week_thursday,
  LocaleKeys.shared_day_of_week_friday,
  LocaleKeys.shared_day_of_week_saturday,
  LocaleKeys.shared_day_of_week_sunday,
];

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => [
  `${i + 1}:00`,
  `${i + 1}:30`,
]).flat();

export const Schedule = ({ onChange }: ScheduleProps) => {
  const { t } = useTranslation();
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>({
    Monday: {
      enabled: true,
      timeSlots: [
        { start: "9:00", end: "13:30" },
        { start: "14:30", end: "17:00" },
      ],
    },
    Tuesday: {
      enabled: true,
      timeSlots: [{ start: "9:30", end: "11:00" }],
    },
    Wednesday: { enabled: true, timeSlots: [{ start: "9:00", end: "17:00" }] },
    Thursday: { enabled: true, timeSlots: [{ start: "9:00", end: "17:00" }] },
    Friday: { enabled: true, timeSlots: [{ start: "9:00", end: "17:00" }] },
    Saturday: { enabled: false, timeSlots: [] },
    Sunday: { enabled: false, timeSlots: [] },
  });

  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({
    Monday: true,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const toggleDayExpanded = (day: string) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const toggleDayEnabled = (day: string, enabled: boolean) => {
    const updatedSchedule = {
      ...schedule,
      [day]: {
        ...schedule[day],
        enabled,
      },
    };
    setSchedule(updatedSchedule);
    onChange?.(updatedSchedule);
  };

  const updateTimeSlot = (
    day: string,
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    const updatedTimeSlots = [...schedule[day].timeSlots];
    updatedTimeSlots[index] = {
      ...updatedTimeSlots[index],
      [field]: value,
    };

    const updatedSchedule = {
      ...schedule,
      [day]: {
        ...schedule[day],
        timeSlots: updatedTimeSlots,
      },
    };

    setSchedule(updatedSchedule);
    onChange?.(updatedSchedule);
  };

  const addTimeSlot = (day: string) => {
    const lastSlot =
      schedule[day].timeSlots[schedule[day].timeSlots.length - 1];
    const newSlot = lastSlot
      ? {
          start: lastSlot.end,
          end:
            TIME_OPTIONS[TIME_OPTIONS.indexOf(lastSlot.end) + 1] ||
            lastSlot.end,
        }
      : { start: "9:00", end: "17:00" };

    const updatedSchedule = {
      ...schedule,
      [day]: {
        ...schedule[day],
        timeSlots: [...schedule[day].timeSlots, newSlot],
      },
    };

    setSchedule(updatedSchedule);
    onChange?.(updatedSchedule);
  };

  const duplicateTimeSlot = (day: string, index: number) => {
    const slotToDuplicate = schedule[day].timeSlots[index];
    const updatedTimeSlots = [...schedule[day].timeSlots];
    updatedTimeSlots.splice(index + 1, 0, { ...slotToDuplicate });

    const updatedSchedule = {
      ...schedule,
      [day]: {
        ...schedule[day],
        timeSlots: updatedTimeSlots,
      },
    };

    setSchedule(updatedSchedule);
    onChange?.(updatedSchedule);
  };

  const removeTimeSlot = (day: string, index: number) => {
    const updatedTimeSlots = [...schedule[day].timeSlots];
    updatedTimeSlots.splice(index, 1);

    const updatedSchedule = {
      ...schedule,
      [day]: {
        ...schedule[day],
        timeSlots: updatedTimeSlots,
      },
    };

    setSchedule(updatedSchedule);
    onChange?.(updatedSchedule);
  };

  const formatTimeRanges = (timeSlots: TimeSlot[]) => {
    return timeSlots.map((slot) => `${slot.start} - ${slot.end}`).join(" · ");
  };

  return (
    <div className="w-full space-y-3 ">
      {DAYS_OF_WEEK.map((day, idx) => (
        <div
          key={day}
          className={`rounded-lg border transition-all ${
            schedule[day].enabled ? "border-gray-100" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <CustomToggle
                initialState={schedule[day].enabled}
                onChange={(enabled) => toggleDayEnabled(day, enabled)}
              />
              <span
                className={`text-sm font-medium ${
                  schedule[day].enabled ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {t(DAY_OF_WEEK_TRANSLATIONS[idx])}
              </span>

              {schedule[day].enabled &&
                !expandedDays[day] &&
                schedule[day].timeSlots.length > 0 && (
                  <span className="text-sm text-gray-500 ml-2">
                    · {formatTimeRanges(schedule[day].timeSlots)}
                  </span>
                )}
            </div>

            {schedule[day].enabled && (
              <button
                onClick={() => toggleDayExpanded(day)}
                className="text-gray-400 hover:text-gray-600"
              >
                {expandedDays[day] ? (
                  <ChevronUpIcon className="size-5" />
                ) : (
                  <ChevronDownIcon className="size-5" />
                )}
              </button>
            )}
          </div>

          {schedule[day].enabled && expandedDays[day] && (
            <div className="px-4 pb-4 space-y-3">
              {schedule[day].timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center gap-2 w-full">
                  <TimeSelect
                    value={slot.start}
                    options={TIME_OPTIONS}
                    onChange={(value) =>
                      updateTimeSlot(day, index, "start", value)
                    }
                  />
                  <span className="text-gray-500 text-sm mx-2">
                    {t(LocaleKeys.components_schedule_to)}
                  </span>
                  <TimeSelect
                    value={slot.end}
                    options={TIME_OPTIONS}
                    onChange={(value) =>
                      updateTimeSlot(day, index, "end", value)
                    }
                  />

                  <div className="flex items-center ml-auto gap-2">
                    <button
                      onClick={() => duplicateTimeSlot(day, index)}
                      className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-all"
                    >
                      <DocumentDuplicateIcon className="size-5" />
                    </button>
                    <button
                      onClick={() => removeTimeSlot(day, index)}
                      className="text-red-500 hover:text-red-600 p-1.5 hover:bg-red-100 rounded-full transition-all"
                    >
                      <TrashIcon className="size-5" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => addTimeSlot(day)}
                className="flex w-full justify-center items-center text-gray-600 hover:text-gray-800 text-sm font-medium bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition-all"
              >
                <PlusIcon className="size-4 mr-1" strokeWidth={3} />
                {t(LocaleKeys.components_schedule_add_button)}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
