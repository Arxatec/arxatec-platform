export interface CalendarEvent {
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
