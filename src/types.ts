import type { CalendarDate, CalendarDateTime } from "@internationalized/date";

export type ViewMode = "month" | "week" | "day";

export type WeekStartDay = "sunday" | "monday";

export interface TimedEvent {
  /** Unique identifier. Must be unique across all events in the calendar. */
  id: string;
  title: string;
  start: CalendarDateTime;
  /** End time, inclusive. A 10:00–11:00 event appears on the day it starts. */
  end: CalendarDateTime;
  color?: string;
  allDay?: false;
}

export interface AllDayEvent {
  /** Unique identifier. Must be unique across all events in the calendar. */
  id: string;
  title: string;
  start: CalendarDate;
  /**
   * End date, inclusive. A single-day event should use `start === end`;
   * a 3-day conference from April 20 through April 22 uses
   * `start: 2026-04-20, end: 2026-04-22`.
   */
  end: CalendarDate;
  color?: string;
  allDay: true;
}

export type CalendarEvent = TimedEvent | AllDayEvent;

export interface MonthGridDay {
  date: CalendarDate;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export interface MonthGridWeek {
  weekNumber: number;
  days: MonthGridDay[];
}

export interface TimeSlot {
  hour: number;
  minute: number;
  label: string;
}

export interface PositionedEvent {
  event: CalendarEvent;
  top: number;
  height: number;
  column: number;
  totalColumns: number;
}
