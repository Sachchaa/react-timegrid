import type { CalendarDate, CalendarDateTime } from "@internationalized/date";

export type ViewMode = "month" | "week" | "day";

export type WeekStartDay = "sunday" | "monday";

export interface TimedEvent {
  id: string;
  title: string;
  start: CalendarDateTime;
  end: CalendarDateTime;
  color?: string;
  allDay?: false;
}

export interface AllDayEvent {
  id: string;
  title: string;
  start: CalendarDate;
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
