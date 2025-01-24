import {
  CalendarDay,
  CalendarMonth,
  CalendarWeek,
  CalendarYear,
} from "../organism";

export default function CalendarPage() {
  return (
    <div className=" px-4 block" style={{ height: "calc(100vh - 144px)" }}>
      <div className="mx-auto bg-white rounded-lg px-4  max-w-5xl w-full h-full ">
        <CalendarDay />
      </div>
    </div>
  );
}
