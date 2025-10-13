import { useDraggable } from "@dnd-kit/core";
import type { CalendarEvent } from "../../types";

interface Props {
  event: CalendarEvent;
  children: React.ReactNode;
}

// Componente draggable para eventos individuales
export const DraggableEvent: React.FC<Props> = ({ event, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: event.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : "auto",
      }
    : {};

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
