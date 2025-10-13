import type { CalendarEvent } from "../../types";
import { calculateAbsolutePosition } from "../../utils";
import { DraggableEvent } from "../draggable_event";

interface Props {
  eventGroup: CalendarEvent[];
  groupStartTime: string;
  groupEndTime: string;
}

// Componente para renderizar múltiples eventos en columnas
export const MultipleEvent: React.FC<Props> = ({
  eventGroup,
  groupStartTime,
  groupEndTime,
}) => {
  const position = calculateAbsolutePosition(groupStartTime, groupEndTime);
  const columnWidth = 100 / eventGroup.length;

  return (
    <div
      style={{
        position: "absolute",
        top: position.top,
        height: position.height,
        left: "0%",
        width: "100%",
        zIndex: 30,
      }}
      className="flex pointer-events-none group/container"
    >
      {eventGroup.map((event, index) => {
        const eventPosition = calculateAbsolutePosition(
          event.startTime,
          event.endTime
        );
        const eventTop =
          parseFloat(eventPosition.top) - parseFloat(position.top);
        const eventHeight = parseFloat(eventPosition.height);

        return (
          <div
            key={event.id}
            style={{
              width: `${columnWidth}%`,
              position: "relative",
              paddingRight: index < eventGroup.length - 1 ? "2px" : "0",
            }}
            className="group/event"
          >
            <DraggableEvent event={event}>
              <div
                style={{
                  position: "absolute",
                  top: `${eventTop}px`,
                  height: `${eventHeight}px`,
                  width: "100%",
                }}
                className={`rounded-lg ${event.bgColor} p-1 text-xs border border-opacity-20 ${event.hoverColor} pointer-events-auto cursor-grab active:cursor-grabbing transition-all duration-200`}
              >
                <p
                  className={`font-semibold ${event.textColor} text-xs truncate`}
                >
                  {event.title}
                </p>
                {event.description && (
                  <p className={`${event.descriptionColor} text-xs truncate`}>
                    {event.description}
                  </p>
                )}
                <p className={`${event.descriptionColor} text-xs`}>
                  {event.startTime}-{event.endTime}
                </p>
              </div>
            </DraggableEvent>
          </div>
        );
      })}
    </div>
  );
};
