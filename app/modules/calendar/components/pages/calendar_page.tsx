import {
  CalendarDay,
  CalendarMonth,
  CalendarWeek,
  CalendarYear,
} from "../organism";

export default function CalendarPage() {
  return (
    <div className="mx-auto bg-white rounded-lg p-4 max-w-5xl w-full h-fit">
      <CalendarDay />
    </div>
  );
}
