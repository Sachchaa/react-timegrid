import { useMemo } from "react";
import type { CalendarDate } from "@internationalized/date";
import type { CalendarEvent, PositionedEvent, AllDayEvent, TimeSlot, WeekStartDay } from "../types";
import { getWeekDates } from "../utils/date-helpers";
import {
  getTimedEventsForDate,
  getAllDayEventsForDate,
  layoutTimedEvents,
} from "../utils/event-layout";
import { formatHour } from "../utils/date-helpers";

export interface UseTimeGridOptions {
  date: CalendarDate;
  events: CalendarEvent[];
  weekStartsOn: WeekStartDay;
  startHour?: number;
  endHour?: number;
  locale: string;
}

export interface DayColumn {
  date: CalendarDate;
  positionedEvents: PositionedEvent[];
  allDayEvents: AllDayEvent[];
}

export interface UseTimeGridReturn {
  columns: DayColumn[];
  timeSlots: TimeSlot[];
  startHour: number;
  endHour: number;
}

export function useTimeGrid(options: UseTimeGridOptions): UseTimeGridReturn {
  const { date, events, weekStartsOn, startHour = 0, endHour = 24, locale } = options;

  return useMemo(() => {
    const dates = getWeekDates(date, weekStartsOn);

    const columns: DayColumn[] = dates.map((d) => {
      const timedEvents = getTimedEventsForDate(events, d);
      const allDayEvents = getAllDayEventsForDate(events, d);
      const positionedEvents = layoutTimedEvents(timedEvents, startHour, endHour);

      return { date: d, positionedEvents, allDayEvents };
    });

    const timeSlots: TimeSlot[] = [];
    for (let h = startHour; h < endHour; h++) {
      for (const m of [0, 30]) {
        timeSlots.push({
          hour: h,
          minute: m,
          label: m === 0 ? formatHour(h, locale) : "",
        });
      }
    }

    return { columns, timeSlots, startHour, endHour };
  }, [date, events, weekStartsOn, startHour, endHour, locale]);
}
