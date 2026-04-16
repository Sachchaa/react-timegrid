import {
  type CalendarDate,
  type CalendarDateTime,
  today,
  getLocalTimeZone,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  getDayOfWeek,
  isSameDay,
  isSameMonth,
} from "@internationalized/date";
import type { WeekStartDay } from "../types";

export {
  today,
  getLocalTimeZone,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
};

const LOCALE_MAP: Record<WeekStartDay, string> = {
  sunday: "en-US",
  monday: "en-GB",
};

export function getWeekStartLocale(weekStartsOn: WeekStartDay): string {
  return LOCALE_MAP[weekStartsOn];
}

export function getStartOfWeek(
  date: CalendarDate,
  weekStartsOn: WeekStartDay,
): CalendarDate {
  const locale = getWeekStartLocale(weekStartsOn);
  return startOfWeek(date, locale);
}

export function getEndOfWeek(
  date: CalendarDate,
  weekStartsOn: WeekStartDay,
): CalendarDate {
  const locale = getWeekStartLocale(weekStartsOn);
  return endOfWeek(date, locale);
}

export function getWeekDays(
  weekStartsOn: WeekStartDay,
  locale: string,
): string[] {
  const base = today(getLocalTimeZone());
  const start = getStartOfWeek(base, weekStartsOn);
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = start.add({ days: i });
    days.push(
      formatter.format(new Date(d.year, d.month - 1, d.day)),
    );
  }
  return days;
}

export function getDaysInMonthGrid(
  date: CalendarDate,
  weekStartsOn: WeekStartDay,
): CalendarDate[] {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const gridStart = getStartOfWeek(monthStart, weekStartsOn);
  const gridEnd = getEndOfWeek(monthEnd, weekStartsOn);

  const days: CalendarDate[] = [];
  let current = gridStart;
  while (current.compare(gridEnd) <= 0) {
    days.push(current);
    current = current.add({ days: 1 });
  }
  return days;
}

export function getWeekDates(
  date: CalendarDate,
  weekStartsOn: WeekStartDay,
): CalendarDate[] {
  const start = getStartOfWeek(date, weekStartsOn);
  const dates: CalendarDate[] = [];
  for (let i = 0; i < 7; i++) {
    dates.push(start.add({ days: i }));
  }
  return dates;
}

export function isDateInRange(
  date: CalendarDate,
  start: CalendarDate,
  end: CalendarDate,
): boolean {
  return date.compare(start) >= 0 && date.compare(end) <= 0;
}

export function getHourFromDateTime(dt: CalendarDateTime): number {
  return dt.hour + dt.minute / 60;
}

export function getDayOfWeekIndex(
  date: CalendarDate,
  weekStartsOn: WeekStartDay,
): number {
  const locale = getWeekStartLocale(weekStartsOn);
  return getDayOfWeek(date, locale);
}

export function formatMonthYear(date: CalendarDate, locale: string): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });
  return formatter.format(new Date(date.year, date.month - 1, date.day));
}

export function formatDayHeader(date: CalendarDate, locale: string): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return formatter.format(new Date(date.year, date.month - 1, date.day));
}

export function formatHour(hour: number, locale: string): string {
  const date = new Date(2000, 0, 1, hour);
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
