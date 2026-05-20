import { useMemo } from "react";
import type { CalendarDate } from "@internationalized/date";
import type { CalendarEvent, AllDayEvent, TimedEvent } from "../types";
import {
  getEventsForDate,
  getTimedEventsForDate,
  getAllDayEventsForDate,
  isAllDayEvent,
  isTimedEvent,
} from "../utils/event-layout";

export interface UseEventsOptions {
  events: CalendarEvent[];
  date: CalendarDate;
}

export interface UseEventsReturn {
  allEvents: CalendarEvent[];
  timedEvents: TimedEvent[];
  allDayEvents: AllDayEvent[];
}

export function useEvents(options: UseEventsOptions): UseEventsReturn {
  const { events, date } = options;

  return useMemo(
    () => ({
      allEvents: getEventsForDate(events, date),
      timedEvents: getTimedEventsForDate(events, date),
      allDayEvents: getAllDayEventsForDate(events, date),
    }),
    [events, date]
  );
}

export { isAllDayEvent, isTimedEvent };
