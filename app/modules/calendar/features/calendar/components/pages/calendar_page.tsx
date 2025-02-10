import { useState } from "react";
import { HeaderCalendar } from "../molecules";
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
    <div className="block" style={{ height: "calc(100vh - 144px)" }}>
      <div className="mx-auto px-4  max-w-7xl w-full h-full overflow-hidden ">
        <HeaderCalendar changeCalendar={changeCalendar} />
        <div className="bg-white rounded-lg shadow-sm mt-2 overflow-hidden h-full relative">
          {calendar == calendars.DAY && <CalendarDay />}
          {calendar == calendars.MONTH && <CalendarMonth />}
          {calendar == calendars.WEEK && <CalendarWeek />}
          {calendar == calendars.YEAR && <CalendarYear />}
        </div>
      </div>
    </div>
  );
}
