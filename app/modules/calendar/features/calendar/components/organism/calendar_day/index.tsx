import { Calendar, Schedule } from "./components/organisms";

export const CalendarDay = () => {
  return (
    <div className="flex gap-2 " style={{ height: "calc(100vh - 235px)" }}>
      <Schedule />
      <Calendar />
    </div>
  );
};
