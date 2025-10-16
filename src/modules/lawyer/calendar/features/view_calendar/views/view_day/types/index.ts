export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string; // Format: "HH:MM" (e.g: "09:30")
  endTime: string; // Format: "HH:MM" (e.g: "10:45")
  bgColor: string;
  hoverColor: string;
  textColor: string;
}
