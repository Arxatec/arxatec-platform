import { useState } from "react";
import { CreateEvent, HeaderCalendar } from "../molecules";
import {
  CalendarDay,
  CalendarMonth,
  CalendarWeek,
  CalendarYear,
} from "../organism";
import { calendars } from "../../types";

export default function CalendarPage() {
  const [calendar, setCalendar] = useState<calendars>(calendars.DAY);
  const changeCalendar = (newCalendar: calendars) => setCalendar(newCalendar);

  return (
    <div className="flex flex-col">
      <div className="mx-auto px-4 max-w-7xl w-full h-full flex flex-col gap-2">
        <CreateEvent></CreateEvent>
        <HeaderCalendar changeCalendar={changeCalendar} />
        {calendar == calendars.DAY && <CalendarDay />}
        {calendar == calendars.MONTH && <CalendarMonth />}
        {calendar == calendars.WEEK && <CalendarWeek />}
        {calendar == calendars.YEAR && <CalendarYear />}
      </div>
    </div>
  );
}
