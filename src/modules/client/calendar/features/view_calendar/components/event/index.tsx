import { DraggableEvent } from "../draggable_event";
import type { CalendarEvent } from "../../types";

interface Props {
  event: CalendarEvent;
  position: {
    top: string;
    height: string;
    left: string;
    width: string;
  };
}
export const Event: React.FC<Props> = ({ event, position }) => {
  return (
    <div
      key={event.id}
      style={{
        position: "absolute",
        top: position.top,
        height: position.height,
        left: position.left,
        width: position.width,
        zIndex: 20,
      }}
      className="pointer-events-none group/container"
    >
      <DraggableEvent event={event}>
        <div
          style={{
            position: "absolute",
            top: "0px",
            height: position.height,
            width: "100%",
          }}
          className={`rounded-lg ${event.bgColor} p-2 text-xs border border-opacity-20 ${event.hoverColor} pointer-events-auto cursor-grab active:cursor-grabbing transition-all duration-200`}
        >
          <p className={`font-semibold ${event.textColor}`}>{event.title}</p>
          {event.description && (
            <p className={`${event.descriptionColor}`}>{event.description}</p>
          )}
          <p className={event.descriptionColor}>
            {event.startTime} - {event.endTime}
          </p>
        </div>
      </DraggableEvent>
    </div>
  );
};
