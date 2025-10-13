import { useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import {
  Header,
  HorizontalLines,
  SelectorDayCalendar,
  TimeSlot,
  MultipleEvent,
  Event,
} from "../components";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { CONTAINER_HEIGHT_PX, initialEvents } from "../constants";
import { type CalendarEvent } from "../types";
import {
  timeToMinutes,
  getGroupTimeRange,
  calculateAbsolutePosition,
  groupEventsByCollisions,
  slotToTime,
} from "../utils";

export default function ViewCalendarPage() {
  const { changeTitle } = useTitle();
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Estado para manejar los eventos de forma dinámica
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  // Configurar sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Función para manejar el final del drag
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const draggedEventId = active.id as string;
    const targetSlot = parseInt(over.id as string);

    // Encontrar el evento que se está arrastrando
    const draggedEvent = events.find((e) => e.id === draggedEventId);
    if (!draggedEvent) return;

    // Calcular la duración original del evento
    const originalDuration =
      timeToMinutes(draggedEvent.endTime) -
      timeToMinutes(draggedEvent.startTime);

    // Calcular nuevo startTime y endTime basado en el slot
    const newStartTime = slotToTime(targetSlot);
    const newStartMinutes = timeToMinutes(newStartTime);
    const newEndMinutes = newStartMinutes + originalDuration;

    // Convertir endMinutes de vuelta a formato HH:MM
    const newEndHours = Math.floor(newEndMinutes / 60);
    const newEndMins = newEndMinutes % 60;
    const newEndTime = `${newEndHours.toString().padStart(2, "0")}:${newEndMins
      .toString()
      .padStart(2, "0")}`;

    // Actualizar el evento en el estado
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === draggedEventId
          ? { ...e, startTime: newStartTime, endTime: newEndTime }
          : e
      )
    );
  };

  useEffect(() => {
    changeTitle("Calendario - Arxatec");
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="isolate flex flex-auto overflow-hidden bg-background">
        <div className="flex flex-auto flex-col overflow-auto">
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-background ring-1 ring-muted" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              <HorizontalLines />
              {/* Contenedor de eventos absolutos con DndContext */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div
                  className="col-start-1 col-end-2 row-start-1 relative"
                  style={{ height: `${CONTAINER_HEIGHT_PX}px` }}
                >
                  {/* Generar slots droppables para cada intervalo de 15 minutos */}
                  {Array.from({ length: 96 }, (_, index) => (
                    <TimeSlot
                      key={`slot-${index + 1}`}
                      slotId={`${index + 1}`}
                    />
                  ))}

                  {/* Renderizar eventos */}
                  {(() => {
                    const eventGroups = groupEventsByCollisions(events);

                    return eventGroups.map((group, groupIndex) => {
                      // Si el grupo tiene solo un evento, renderizar normalmente
                      if (group.length === 1) {
                        const event = group[0];
                        const position = calculateAbsolutePosition(
                          event.startTime,
                          event.endTime
                        );

                        return (
                          <Event
                            key={event.id}
                            event={event}
                            position={position}
                          />
                        );
                      } else {
                        // Si hay múltiples eventos, usar el componente MultipleEvent
                        const { startTime, endTime } = getGroupTimeRange(group);

                        return (
                          <MultipleEvent
                            key={`group-${groupIndex}`}
                            eventGroup={group}
                            groupStartTime={startTime}
                            groupEndTime={endTime}
                          />
                        );
                      }
                    });
                  })()}
                </div>
              </DndContext>
            </div>
          </div>
        </div>

        <SelectorDayCalendar date={date} setDate={setDate} />
      </div>
    </div>
  );
}
