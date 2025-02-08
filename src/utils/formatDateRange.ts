import dayjs from "dayjs";

export function formatDateRange(departureDate: string, returnDate: string): string {
  const departure = dayjs(departureDate);
  const returnDay = dayjs(returnDate);

  // Mismo mes
  if (departure.month() === returnDay.month()) {
    return `${departure.format("MMM D")}-${returnDay.format("D, YYYY")}`;
  }

  // Mes diferente
  return `${departure.format("MMM D")} - ${returnDay.format("MMM D, YYYY")}`;
}
