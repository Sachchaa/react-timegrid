import type { CalendarDate } from "@internationalized/date";

export function getGridCellAriaLabel(
  date: CalendarDate,
  locale: string,
  eventCount: number,
): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const dateStr = formatter.format(
    new Date(date.year, date.month - 1, date.day),
  );
  if (eventCount === 0) return dateStr;
  return `${dateStr}, ${eventCount} event${eventCount > 1 ? "s" : ""}`;
}

export function getTimeSlotAriaLabel(
  hour: number,
  locale: string,
): string {
  const date = new Date(2000, 0, 1, hour);
  const endDate = new Date(2000, 0, 1, hour + 1);
  const formatter = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${formatter.format(date)} to ${formatter.format(endDate)}`;
}

export function getEventAriaLabel(
  title: string,
  startTime: string,
  endTime: string,
): string {
  return `${title}, ${startTime} to ${endTime}`;
}

export function getNavigationAnnouncement(
  label: string,
): string {
  return label;
}
