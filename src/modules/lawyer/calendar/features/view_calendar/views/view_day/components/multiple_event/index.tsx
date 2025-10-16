import type { CalendarEvent } from "../../types";
import { calculateAbsolutePosition } from "../../utils";
import { DraggableEvent } from "../";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";

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
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <div
                    style={{
                      position: "absolute",
                      top: `${eventTop}px`,
                      height: `${eventHeight}px`,
                      width: "100%",
                    }}
                    className={`rounded border border-background ${event.bgColor} p-2 text-xs ${event.hoverColor} pointer-events-auto cursor-grab active:cursor-grabbing transition-all duration-200`}
                  >
                    <p
                      className={`font-bold font-serif text-base ${event.textColor} truncate`}
                    >
                      {event.title}
                    </p>
                    <p className={`${event.descriptionColor} text-sm`}>
                      {event.startTime}-{event.endTime}
                    </p>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>
                    <EyeIcon className="w-4 h-4" />
                    <span>Ver detalle evento</span>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <PencilIcon className="w-4 h-4" />
                    <span>Editar evento</span>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">
                    <Trash2Icon className="w-4 h-4" />
                    <span>Eliminar evento</span>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </DraggableEvent>
          </div>
        );
      })}
    </div>
  );
};
