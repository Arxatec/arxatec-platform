import { formatDate } from "date-fns";
import { es } from "date-fns/locale";

export const getCurrentDate = () => {
  return formatDate(new Date(), "dd 'de' MMMM 'del' yyyy", {
    locale: es,
  });
};

export const getCurrentDay = () => {
  return formatDate(new Date(), "EEEE", {
    locale: es,
  });
};

export function combineDateAndTime(dateISO: string, time: string): string {
  const date = new Date(dateISO);
  const [hours, minutes] = time.split(":").map(Number);

  const combined = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    0,
    0
  );

  return combined.toISOString();
}
