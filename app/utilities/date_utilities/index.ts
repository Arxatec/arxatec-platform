export function getMonthName(month: number): string {
  const monthNames: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  if (month < 1 || month > 12) {
    throw new Error("El mes debe estar entre 1 y 12");
  }

  return monthNames[month - 1];
}

export function getDayName(day: number): string {
  const dayNames: string[] = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  if (day < 0 || day > 6) {
    throw new Error("El día debe estar entre 0 (Domingo) y 6 (Sábado)");
  }

  return dayNames[day];
}
