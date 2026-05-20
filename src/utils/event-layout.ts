import { type CalendarDate, toCalendarDate } from "@internationalized/date";
import type { CalendarEvent, AllDayEvent, TimedEvent, PositionedEvent } from "../types";
import { isDateInRange, getHourFromDateTime } from "./date-helpers";

export function isAllDayEvent(event: CalendarEvent): event is AllDayEvent {
  return event.allDay === true;
}

export function isTimedEvent(event: CalendarEvent): event is TimedEvent {
  return !event.allDay;
}

/**
 * Returns events active on `date`. `event.end` is treated as INCLUSIVE for
 * both all-day and timed events (an all-day event with start=end spans one
 * day; a timed event ending at 23:00 on day N is returned for day N).
 */
export function getEventsForDate(events: CalendarEvent[], date: CalendarDate): CalendarEvent[] {
  return events.filter((event) => {
    if (isAllDayEvent(event)) {
      return isDateInRange(date, event.start, event.end);
    }
    const eventDate = toCalendarDate(event.start);
    const eventEndDate = toCalendarDate(event.end);
    return isDateInRange(date, eventDate, eventEndDate);
  });
}

export function getTimedEventsForDate(events: CalendarEvent[], date: CalendarDate): TimedEvent[] {
  return getEventsForDate(events, date).filter(isTimedEvent);
}

export function getAllDayEventsForDate(events: CalendarEvent[], date: CalendarDate): AllDayEvent[] {
  return getEventsForDate(events, date).filter(isAllDayEvent);
}

/**
 * Column-packing algorithm for overlapping timed events.
 * Events that overlap in time are placed in parallel columns.
 */
export function layoutTimedEvents(
  events: TimedEvent[],
  startHour: number = 0,
  endHour: number = 24
): PositionedEvent[] {
  if (events.length === 0) return [];

  const totalMinutes = (endHour - startHour) * 60;

  const sorted = [...events].sort((a, b) => {
    const aStart = getHourFromDateTime(a.start);
    const bStart = getHourFromDateTime(b.start);
    if (aStart !== bStart) return aStart - bStart;
    const aEnd = getHourFromDateTime(a.end);
    const bEnd = getHourFromDateTime(b.end);
    return bEnd - aEnd;
  });

  const columns: { end: number; event: TimedEvent }[][] = [];

  for (const event of sorted) {
    const eventStart = getHourFromDateTime(event.start);
    let placed = false;

    for (const column of columns) {
      const lastInColumn = column[column.length - 1];
      if (lastInColumn.end <= eventStart) {
        column.push({ end: getHourFromDateTime(event.end), event });
        placed = true;
        break;
      }
    }

    if (!placed) {
      columns.push([{ end: getHourFromDateTime(event.end), event }]);
    }
  }

  const totalColumns = Math.max(columns.length, 1);
  const positioned: PositionedEvent[] = [];

  for (let colIdx = 0; colIdx < columns.length; colIdx++) {
    for (const { event } of columns[colIdx]) {
      const rawStart = (getHourFromDateTime(event.start) - startHour) * 60;
      const rawEnd = (getHourFromDateTime(event.end) - startHour) * 60;
      const eventStartMinutes = Math.max(0, Math.min(rawStart, totalMinutes));
      const eventEndMinutes = Math.max(eventStartMinutes, Math.min(rawEnd, totalMinutes));

      positioned.push({
        event,
        top: (eventStartMinutes / totalMinutes) * 100,
        height: ((eventEndMinutes - eventStartMinutes) / totalMinutes) * 100,
        column: colIdx,
        totalColumns,
      });
    }
  }

  return positioned;
}
