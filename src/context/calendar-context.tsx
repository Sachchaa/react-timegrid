import { createContext, useContext } from "react";
import type { CalendarDate } from "@internationalized/date";
import type { CalendarEvent, ViewMode, WeekStartDay } from "../types";

export interface CalendarContextValue {
  view: ViewMode;
  currentDate: CalendarDate;
  events: CalendarEvent[];
  locale: string;
  weekStartsOn: WeekStartDay;
  onNavigate: (date: CalendarDate) => void;
  onViewChange: (view: ViewMode) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: CalendarDate) => void;
}

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export function useCalendarContext(): CalendarContextValue {
  const ctx = useContext(CalendarContext);
  if (!ctx) {
    throw new Error("useCalendarContext must be used within a <Calendar />");
  }
  return ctx;
}
