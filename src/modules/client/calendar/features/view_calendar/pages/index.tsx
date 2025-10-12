import { useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import { Header, HorizontalLines, SelectorDayCalendar } from "../components";

// Definir la interfaz para los eventos
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string; // Formato: "HH:MM" (ej: "09:30")
  endTime: string; // Formato: "HH:MM" (ej: "10:45")
  bgColor: string;
  hoverColor: string;
  textColor: string;
  descriptionColor: string;
}

// Constantes para el calendario
const TOTAL_MINUTES_IN_DAY = 24 * 60; // 1440 minutos
const SLOT_HEIGHT_PX = 50; // 50px por slot
const TOTAL_SLOTS = 96; // 24 horas * 4 slots por hora
const HEADER_HEIGHT_PX = 28; // h-7 = 1.75rem = 28px del header
const CONTAINER_HEIGHT_PX = TOTAL_SLOTS * SLOT_HEIGHT_PX + HEADER_HEIGHT_PX; // 4800px + 28px

// Función para convertir tiempo (HH:MM) a minutos desde medianoche
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Función para calcular la posición absoluta de un evento
const calculateAbsolutePosition = (startTime: string, endTime: string) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const duration = endMinutes - startMinutes;

  // Calcular posición vertical (top y height en píxeles)
  // Agregamos HEADER_HEIGHT_PX para compensar el header del grid
  const top =
    HEADER_HEIGHT_PX +
    (startMinutes / TOTAL_MINUTES_IN_DAY) * (TOTAL_SLOTS * SLOT_HEIGHT_PX);
  const height =
    (duration / TOTAL_MINUTES_IN_DAY) * (TOTAL_SLOTS * SLOT_HEIGHT_PX);

  return {
    top: `${top}px`,
    height: `${height}px`,
    left: "0%",
    width: "100%", // Por ahora 100%, después manejaremos colisiones
  };
};

// Función para detectar si dos eventos colisionan en tiempo
const eventsOverlap = (
  event1: CalendarEvent,
  event2: CalendarEvent
): boolean => {
  const start1 = timeToMinutes(event1.startTime);
  const end1 = timeToMinutes(event1.endTime);
  const start2 = timeToMinutes(event2.startTime);
  const end2 = timeToMinutes(event2.endTime);

  // Dos eventos colisionan si se superponen en tiempo
  return start1 < end2 && start2 < end1;
};

// Función para agrupar eventos por colisiones SOLO directas (no transitivas)
const groupEventsByCollisions = (
  events: CalendarEvent[]
): CalendarEvent[][] => {
  const groups: CalendarEvent[][] = [];
  const processed = new Set<string>();

  // Ordenar eventos por hora de inicio para procesarlos cronológicamente
  const sortedEvents = [...events].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );

  sortedEvents.forEach((event) => {
    if (processed.has(event.id)) return;

    // Encontrar SOLO los eventos que colisionan directamente con este
    const directCollisions = sortedEvents.filter(
      (otherEvent) =>
        otherEvent.id !== event.id &&
        !processed.has(otherEvent.id) &&
        eventsOverlap(event, otherEvent)
    );

    if (directCollisions.length > 0) {
      // Crear grupo con el evento actual + sus colisiones directas
      const collisionGroup = [event, ...directCollisions];

      // Marcar todos como procesados
      collisionGroup.forEach((e) => processed.add(e.id));

      groups.push(collisionGroup);
    } else {
      // Evento sin colisiones, va solo
      groups.push([event]);
      processed.add(event.id);
    }
  });

  return groups;
};

// Componente para renderizar múltiples eventos en columnas
const MultipleEvent = ({
  eventGroup,
  groupStartTime,
  groupEndTime,
}: {
  eventGroup: CalendarEvent[];
  groupStartTime: string;
  groupEndTime: string;
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
        zIndex: 20,
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
            <div
              style={{
                position: "absolute",
                top: `${eventTop}px`,
                height: `${eventHeight}px`,
                width: "100%",
              }}
              className={`rounded-lg ${event.bgColor} p-1 text-xs border border-opacity-20 ${event.hoverColor} pointer-events-auto cursor-pointer transition-all duration-200 `}
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
          </div>
        );
      })}
    </div>
  );
};

// Función para calcular el tiempo de inicio y fin de un grupo de eventos
const getGroupTimeRange = (eventGroup: CalendarEvent[]) => {
  const startTimes = eventGroup.map((e) => timeToMinutes(e.startTime));
  const endTimes = eventGroup.map((e) => timeToMinutes(e.endTime));

  const earliestStart = Math.min(...startTimes);
  const latestEnd = Math.max(...endTimes);

  const startHours = Math.floor(earliestStart / 60);
  const startMinutes = earliestStart % 60;
  const endHours = Math.floor(latestEnd / 60);
  const endMinutes = latestEnd % 60;

  return {
    startTime: `${startHours.toString().padStart(2, "0")}:${startMinutes
      .toString()
      .padStart(2, "0")}`,
    endTime: `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`,
  };
};

const events: CalendarEvent[] = [
  // Multiples eventos

  {
    id: "11",
    title: "Prueba 1",
    startTime: "04:00",
    endTime: "05:00",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    textColor: "text-green-700",
    descriptionColor: "text-green-500 group-hover:text-green-700",
  },
  {
    id: "12",
    title: "Prueba 2",
    startTime: "04:00",
    endTime: "05:00",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    textColor: "text-green-700",
    descriptionColor: "text-green-500 group-hover:text-green-700",
  },
  {
    id: "13",
    title: "Prueba 3",
    startTime: "04:00",
    endTime: "05:00",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    textColor: "text-green-700",
    descriptionColor: "text-green-500 group-hover:text-green-700",
  },
  {
    id: "14",
    title: "Prueba 4",
    startTime: "04:00",
    endTime: "05:00",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    textColor: "text-green-700",
    descriptionColor: "text-green-500 group-hover:text-green-700",
  },
  {
    id: "15",
    title: "Prueba 1",
    startTime: "04:00",
    endTime: "05:00",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    textColor: "text-green-700",
    descriptionColor: "text-green-500 group-hover:text-green-700",
  },
  {
    id: "16",
    title: "Prueba 2",
    startTime: "04:00",
    endTime: "05:00",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    textColor: "text-green-700",
    descriptionColor: "text-green-500 group-hover:text-green-700",
  },
  {
    id: "17",
    title: "Prueba 3",
    startTime: "04:00",
    endTime: "05:00",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    textColor: "text-green-700",
    descriptionColor: "text-green-500 group-hover:text-green-700",
  },
  {
    id: "18",
    title: "Prueba 4",
    startTime: "04:00",
    endTime: "05:00",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    textColor: "text-green-700",
    descriptionColor: "text-green-500 group-hover:text-green-700",
  },

  // Solapamiento parcial
  {
    id: "1",
    title: "Morning Jog",
    startTime: "06:00",
    endTime: "07:00",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    textColor: "text-green-700",
    descriptionColor: "text-green-500 group-hover:text-green-700",
  },
  {
    id: "2",
    title: "Breakfast",
    startTime: "06:30",
    endTime: "07:30",
    bgColor: "bg-yellow-50",
    hoverColor: "hover:bg-yellow-100",
    textColor: "text-yellow-700",
    descriptionColor: "text-yellow-600 group-hover:text-yellow-700",
  },
  {
    id: "3",
    title: "Team Standup",
    startTime: "07:00",
    endTime: "08:00",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
    textColor: "text-blue-700",
    descriptionColor: "text-blue-500 group-hover:text-blue-700",
  },

  // Colisión total inicio
  {
    id: "4",
    title: "Client Call A",
    startTime: "09:00",
    endTime: "10:00",
    bgColor: "bg-pink-50",
    hoverColor: "hover:bg-pink-100",
    textColor: "text-pink-700",
    descriptionColor: "text-pink-500 group-hover:text-pink-700",
  },
  {
    id: "5",
    title: "Client Call B",
    startTime: "09:00",
    endTime: "09:45",
    bgColor: "bg-red-50",
    hoverColor: "hover:bg-red-100",
    textColor: "text-red-700",
    descriptionColor: "text-red-500 group-hover:text-red-700",
  },
  {
    id: "6",
    title: "Client Call C",
    startTime: "09:00",
    endTime: "10:30",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-100",
    textColor: "text-purple-700",
    descriptionColor: "text-purple-500 group-hover:text-purple-700",
  },

  // Eventos aislados
  {
    id: "7",
    title: "Lunch Break",
    startTime: "12:00",
    endTime: "13:00",
    bgColor: "bg-orange-50",
    hoverColor: "hover:bg-orange-100",
    textColor: "text-orange-700",
    descriptionColor: "text-orange-500 group-hover:text-orange-700",
  },

  // Solapamiento parcial largo
  {
    id: "8",
    title: "Project Work",
    startTime: "13:30",
    endTime: "15:00",
    bgColor: "bg-teal-50",
    hoverColor: "hover:bg-teal-100",
    textColor: "text-teal-700",
    descriptionColor: "text-teal-500 group-hover:text-teal-700",
  },
  {
    id: "9",
    title: "Code Review",
    startTime: "14:00",
    endTime: "15:30",
    bgColor: "bg-cyan-50",
    hoverColor: "hover:bg-cyan-100",
    textColor: "text-cyan-700",
    descriptionColor: "text-cyan-500 group-hover:text-cyan-700",
  },
  {
    id: "10",
    title: "Meeting with HR",
    startTime: "15:00",
    endTime: "16:00",
    bgColor: "bg-lime-50",
    hoverColor: "hover:bg-lime-100",
    textColor: "text-lime-700",
    descriptionColor: "text-lime-500 group-hover:text-lime-700",
  },
];

export default function ViewCalendarPage() {
  const { changeTitle } = useTitle();
  const [date, setDate] = useState<Date | undefined>(undefined);

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
              {/* Contenedor de eventos absolutos */}
              <div
                className="col-start-1 col-end-2 row-start-1 relative"
                style={{ height: `${CONTAINER_HEIGHT_PX}px` }}
              >
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
                        <div
                          key={event.id}
                          style={{
                            position: "absolute",
                            top: position.top,
                            height: position.height,
                            left: position.left,
                            width: position.width,
                            zIndex: 10,
                          }}
                          className={`rounded-lg ${event.bgColor} p-2 text-xs border border-opacity-20 ${event.hoverColor}`}
                        >
                          <p className={`font-semibold ${event.textColor}`}>
                            {event.title}
                          </p>
                          {event.description && (
                            <p className={`${event.descriptionColor}`}>
                              {event.description}
                            </p>
                          )}
                          <p className={event.descriptionColor}>
                            {event.startTime} - {event.endTime}
                          </p>
                        </div>
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
            </div>
          </div>
        </div>

        <SelectorDayCalendar date={date} setDate={setDate} />
      </div>
    </div>
  );
}
