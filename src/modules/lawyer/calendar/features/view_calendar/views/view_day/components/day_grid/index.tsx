import {
  DndContext,
  closestCenter,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  HorizontalLines,
  TimeSlot,
  Event,
  MultipleEvent,
} from "../../components";
import { CONTAINER_HEIGHT_PX } from "../../constants";
import {
  groupEventsByCollisions,
  calculateAbsolutePosition,
  getGroupTimeRange,
} from "../../utils";
import type { CalendarEvent } from "../../types";

export const DayGrid = ({
  events,
  sensors,
  handleDragEnd,
}: {
  events: CalendarEvent[];
  sensors: ReturnType<typeof useSensors>;
  handleDragEnd: (event: DragEndEvent) => void;
}) => (
  <DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
  >
    <div
      className="col-start-1 col-end-2 row-start-1 relative"
      style={{ height: `${CONTAINER_HEIGHT_PX}px` }}
    >
      <HorizontalLines />
      {Array.from({ length: 96 }, (_, i) => (
        <TimeSlot key={`slot-${i + 1}`} slotId={`${i + 1}`} />
      ))}
      {groupEventsByCollisions(events).map((group, i) =>
        group.length === 1 ? (
          <Event
            key={group[0].id}
            event={group[0]}
            position={calculateAbsolutePosition(
              group[0].startTime,
              group[0].endTime
            )}
          />
        ) : (
          <MultipleEvent
            key={`group-${i}`}
            eventGroup={group}
            groupStartTime={getGroupTimeRange(group).startTime}
            groupEndTime={getGroupTimeRange(group).endTime}
          />
        )
      )}
    </div>
  </DndContext>
);
