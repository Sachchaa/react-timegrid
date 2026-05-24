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

interface DaySegment {
  event: TimedEvent;
  start: number;
  end: number;
}

/**
 * Column-packing algorithm for overlapping timed events.
 * Events that overlap in time are placed in parallel columns.
 *
 * Each event is clamped to `date`'s visible window before layout. A multi-day
 * event extends to the window edge on days it fully spans, so an overnight or
 * multi-day event renders as a block on every day it touches instead of
 * collapsing to zero height on days other than its start.
 */
export function layoutTimedEvents(
  events: TimedEvent[],
  date: CalendarDate,
  startHour: number = 0,
  endHour: number = 24
): PositionedEvent[] {
  const windowHours = endHour - startHour;
  if (events.length === 0 || windowHours <= 0) return [];

  // Resolve each event to the slice of [startHour, endHour] it occupies on
  // `date`: full window before/after for days it spans, the event's own time on
  // its start/end day. Segments with no visible extent are dropped.
  const segments: DaySegment[] = [];
  for (const event of events) {
    const startsBeforeToday = toCalendarDate(event.start).compare(date) < 0;
    const endsAfterToday = toCalendarDate(event.end).compare(date) > 0;
    const rawStart = startsBeforeToday ? startHour : getHourFromDateTime(event.start);
    const rawEnd = endsAfterToday ? endHour : getHourFromDateTime(event.end);
    const start = Math.max(startHour, Math.min(rawStart, endHour));
    const end = Math.max(startHour, Math.min(rawEnd, endHour));
    if (end > start) {
      segments.push({ event, start, end });
    }
  }

  if (segments.length === 0) return [];

  segments.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return b.end - a.end;
  });

  const positioned: PositionedEvent[] = [];

  // Group segments into clusters of transitively-overlapping events, then pack
  // columns within each cluster. Column count is per cluster (not per day) so a
  // single overlapping pair doesn't shrink unrelated events elsewhere in the day.
  let cluster: DaySegment[] = [];
  let clusterEnd = -Infinity;

  const flushCluster = () => {
    if (cluster.length === 0) return;

    const columns: DaySegment[][] = [];
    for (const seg of cluster) {
      let placed = false;
      for (const column of columns) {
        const lastInColumn = column[column.length - 1];
        if (lastInColumn.end <= seg.start) {
          column.push(seg);
          placed = true;
          break;
        }
      }
      if (!placed) {
        columns.push([seg]);
      }
    }

    const totalColumns = Math.max(columns.length, 1);
    for (let colIdx = 0; colIdx < columns.length; colIdx++) {
      for (const seg of columns[colIdx]) {
        positioned.push({
          event: seg.event,
          top: ((seg.start - startHour) / windowHours) * 100,
          height: ((seg.end - seg.start) / windowHours) * 100,
          column: colIdx,
          totalColumns,
        });
      }
    }

    cluster = [];
    clusterEnd = -Infinity;
  };

  for (const seg of segments) {
    if (cluster.length > 0 && seg.start >= clusterEnd) {
      flushCluster();
    }
    cluster.push(seg);
    clusterEnd = Math.max(clusterEnd, seg.end);
  }
  flushCluster();

  return positioned;
}
