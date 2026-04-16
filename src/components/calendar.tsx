import { useState, useCallback, useMemo } from "react";
import type { CalendarDate } from "@internationalized/date";
import { today, getLocalTimeZone } from "@internationalized/date";
import type { CalendarEvent, ViewMode, WeekStartDay } from "../types";
import { CalendarContext, type CalendarContextValue } from "../context/calendar-context";
import { useCalendarNav } from "../hooks/use-calendar-nav";
import { Header } from "./header";
import { MonthView } from "./month-view/month-view";
import { WeekView } from "./week-view/week-view";
import { DayView } from "./day-view/day-view";
import { EventPopover } from "./shared/event-popover";

export interface CalendarProps {
  /** Current view mode (controlled) */
  view?: ViewMode;
  /** Default view mode (uncontrolled) */
  defaultView?: ViewMode;
  /** Current date (controlled) */
  value?: CalendarDate;
  /** Default date (uncontrolled) */
  defaultValue?: CalendarDate;
  /** Calendar events */
  events?: CalendarEvent[];
  /** Locale for formatting */
  locale?: string;
  /** Day the week starts on */
  weekStartsOn?: WeekStartDay;
  /** Called when an event is clicked */
  onEventClick?: (event: CalendarEvent) => void;
  /** Called when a date cell is clicked */
  onDateClick?: (date: CalendarDate) => void;
  /** Called when view changes */
  onViewChange?: (view: ViewMode) => void;
  /** Called when navigation changes the date */
  onNavigate?: (date: CalendarDate) => void;
  /** Additional class names */
  className?: string;
}

export function Calendar({
  view: controlledView,
  defaultView = "month",
  value,
  defaultValue,
  events = [],
  locale = "en-US",
  weekStartsOn = "sunday",
  onEventClick,
  onDateClick,
  onViewChange,
  onNavigate,
  className,
}: CalendarProps) {
  const nav = useCalendarNav({
    defaultValue: defaultValue ?? today(getLocalTimeZone()),
    value,
    onNavigate,
    defaultView,
    view: controlledView,
    onViewChange,
  });

  const [popoverEvent, setPopoverEvent] = useState<CalendarEvent | null>(null);
  const [popoverAnchor, setPopoverAnchor] = useState<DOMRect | null>(null);

  const handleEventClick = useCallback(
    (event: CalendarEvent) => {
      onEventClick?.(event);

      const activeEl = document.activeElement;
      if (activeEl instanceof HTMLElement) {
        setPopoverAnchor(activeEl.getBoundingClientRect());
        setPopoverEvent(event);
      }
    },
    [onEventClick],
  );

  const closePopover = useCallback(() => {
    setPopoverEvent(null);
    setPopoverAnchor(null);
  }, []);

  const contextValue: CalendarContextValue = useMemo(
    () => ({
      view: nav.view,
      currentDate: nav.currentDate,
      events,
      locale,
      weekStartsOn,
      onNavigate: nav.goToDate,
      onViewChange: nav.setView,
      onEventClick: handleEventClick,
      onDateClick,
    }),
    [
      nav.view,
      nav.currentDate,
      nav.goToDate,
      nav.setView,
      events,
      locale,
      weekStartsOn,
      handleEventClick,
      onDateClick,
    ],
  );

  return (
    <CalendarContext.Provider value={contextValue}>
      <div className={`relative bg-white ${className ?? ""}`}>
        <Header
          onNext={nav.goToNext}
          onPrev={nav.goToPrev}
          onToday={nav.goToToday}
        />

        <div className="px-4 pb-4">
          {nav.view === "month" && <MonthView />}
          {nav.view === "week" && <WeekView />}
          {nav.view === "day" && <DayView />}
        </div>

        <EventPopover
          event={popoverEvent}
          anchorRect={popoverAnchor}
          onClose={closePopover}
        />
      </div>
    </CalendarContext.Provider>
  );
}
