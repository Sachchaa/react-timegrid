import { useMemo } from "react";
import { type CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
import type { CalendarEvent, MonthGridWeek, WeekStartDay } from "../types";
import {
  getDaysInMonthGrid,
  isSameDay,
  isSameMonth,
} from "../utils/date-helpers";
import { getEventsForDate } from "../utils/event-layout";

export interface UseMonthGridOptions {
  date: CalendarDate;
  events: CalendarEvent[];
  weekStartsOn: WeekStartDay;
}

export interface UseMonthGridReturn {
  weeks: MonthGridWeek[];
}

export function useMonthGrid(options: UseMonthGridOptions): UseMonthGridReturn {
  const { date, events, weekStartsOn } = options;

  const weeks = useMemo(() => {
    const days = getDaysInMonthGrid(date, weekStartsOn);
    const todayDate = today(getLocalTimeZone());
    const result: MonthGridWeek[] = [];

    for (let i = 0; i < days.length; i += 7) {
      const weekDays = days.slice(i, i + 7).map((d) => ({
        date: d,
        isCurrentMonth: isSameMonth(d, date),
        isToday: isSameDay(d, todayDate),
        events: getEventsForDate(events, d),
      }));
      result.push({
        weekNumber: Math.floor(i / 7),
        days: weekDays,
      });
    }

    return result;
  }, [date, events, weekStartsOn]);

  return { weeks };
}
