import { useDayEvents, useEventDragAndDrop } from "../hooks";
import { DayGrid } from "../components/day_grid";

interface Props {
  date: Date;
}

export const ViewDayView: React.FC<Props> = ({ date }) => {
  const currentDate = date ? new Date(date) : new Date();
  const start = new Date(currentDate.setHours(0, 0, 0, 0));
  const end = new Date(currentDate.setHours(23, 59, 59, 999));

  const { events, setEvents } = useDayEvents(start, end);
  const { sensors, handleDragEnd } = useEventDragAndDrop(events, setEvents);

  return (
    <div className="flex flex-auto flex-col overflow-auto ">
      <div className="flex w-full flex-auto">
        <div className="w-14 flex-none bg-background ring-1 ring-muted" />
        <div className="grid flex-auto grid-cols-1 grid-rows-1">
          <DayGrid
            events={events}
            sensors={sensors}
            handleDragEnd={handleDragEnd}
          />
        </div>
      </div>
    </div>
  );
};
