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
