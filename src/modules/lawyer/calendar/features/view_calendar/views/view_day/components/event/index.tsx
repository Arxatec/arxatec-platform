import type { CalendarEvent } from "../../types";
import { twMerge } from "tailwind-merge";
import { DraggableEvent } from "../";
import { EventContextMenuWrapper } from "../../../../components";

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
        <EventContextMenuWrapper eventId={event.id}>
          <div
            style={{
              position: "absolute",
              top: "0px",
              height: position.height,
              width: "100%",
            }}
            className={`rounded border border-background ${event.bgColor} p-2 text-xs ${event.hoverColor} pointer-events-auto cursor-grab active:cursor-grabbing transition-all duration-200`}
          >
            <p className={`font-bold font-serif text-base ${event.textColor}`}>
              {event.title}
            </p>
            <p className={twMerge("text-sm opacity-70", event.textColor)}>
              {event.startTime} - {event.endTime}
            </p>
          </div>
        </EventContextMenuWrapper>
      </DraggableEvent>
    </div>
  );
};
