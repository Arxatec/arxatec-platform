import { DraggableEvent } from "../draggable_event";
import type { CalendarEvent } from "../../types";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";

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
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              style={{
                position: "absolute",
                top: "0px",
                height: position.height,
                width: "100%",
              }}
              className={`rounded border border-background ${event.bgColor} p-2 text-xs ${event.hoverColor} pointer-events-auto cursor-grab active:cursor-grabbing transition-all duration-200`}
            >
              <p
                className={`font-bold font-serif text-base ${event.textColor}`}
              >
                {event.title}
              </p>
              <p className={`${event.descriptionColor} text-sm`}>
                {event.startTime} - {event.endTime}
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
};
