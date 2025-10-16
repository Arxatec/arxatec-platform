import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { timeToMinutes, slotToTime } from "../../utils";
import type { CalendarEvent } from "../../types";
import type { DragEndEvent } from "@dnd-kit/core";

export const useEventDragAndDrop = (
  events: CalendarEvent[],
  setEvents: (updater: (prev: CalendarEvent[]) => CalendarEvent[]) => void
) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedEventId = active.id as string;
    const targetSlot = parseInt(over.id as string);
    const draggedEvent = events.find((e) => e.id === draggedEventId);
    if (!draggedEvent) return;

    const duration =
      timeToMinutes(draggedEvent.endTime) -
      timeToMinutes(draggedEvent.startTime);

    const newStartTime = slotToTime(targetSlot);
    const startMins = timeToMinutes(newStartTime);
    const endMins = startMins + duration;
    const newEndTime = `${Math.floor(endMins / 60)
      .toString()
      .padStart(2, "0")}:${(endMins % 60).toString().padStart(2, "0")}`;

    setEvents((prev: CalendarEvent[]) =>
      prev.map((e) =>
        e.id === draggedEventId
          ? { ...e, startTime: newStartTime, endTime: newEndTime }
          : e
      )
    );
  };

  return { sensors, handleDragEnd };
};
