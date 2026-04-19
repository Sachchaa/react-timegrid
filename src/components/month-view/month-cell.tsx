import { useCallback, useRef } from "react";
import type { MonthGridDay, CalendarEvent } from "../../types";
import { useCalendarContext } from "../../context/calendar-context";
import { getGridCellAriaLabel } from "../../utils/aria";
import { isAllDayEvent } from "../../utils/event-layout";

const MAX_VISIBLE_EVENTS = 3;

const EVENT_CLASS =
  "bg-accent text-accent-foreground border-l-primary";

interface MonthCellProps {
  day: MonthGridDay;
  tabIndex: number;
  onFocus?: () => void;
  "data-cell-index"?: string;
}

export function MonthCell({
  day,
  tabIndex,
  onFocus,
  "data-cell-index": dataCellIndex,
}: MonthCellProps) {
  const { locale, onDateClick, onEventClick } = useCalendarContext();
  const cellRef = useRef<HTMLDivElement>(null);

  const handleDateClick = useCallback(() => {
    onDateClick?.(day.date);
  }, [onDateClick, day.date]);

  const handleEventClick = useCallback(
    (e: React.MouseEvent, event: CalendarEvent) => {
      e.stopPropagation();
      onEventClick?.(event);
    },
    [onEventClick],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDateClick();
      }
    },
    [handleDateClick],
  );

  const visibleEvents = day.events.slice(0, MAX_VISIBLE_EVENTS);
  const overflowCount = day.events.length - MAX_VISIBLE_EVENTS;

  return (
    <div
      ref={cellRef}
      role="gridcell"
      tabIndex={tabIndex}
      data-cell-index={dataCellIndex}
      aria-label={getGridCellAriaLabel(day.date, locale, day.events.length)}
      className={`
        min-h-28 border-b border-r border-border p-1.5 cursor-pointer
        transition-colors hover:bg-accent/50 focus:outline-none focus:ring-2
        focus:ring-ring focus:ring-inset
        ${!day.isCurrentMonth ? "bg-muted/30" : "bg-card"}
      `}
      onClick={handleDateClick}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
    >
      <span
        className={`
          inline-flex h-7 w-7 items-center justify-center rounded-full text-sm
          ${day.isToday ? "bg-primary font-semibold text-primary-foreground" : ""}
          ${!day.isCurrentMonth ? "text-muted-foreground" : "text-foreground"}
        `}
      >
        {day.date.day}
      </span>

      <div className="mt-1 space-y-0.5">
        {visibleEvents.map((event) => (
          <button
            key={event.id}
            type="button"
            className={`
              block w-full truncate rounded border-l-2 px-1.5 py-0.5
              text-left text-xs font-medium
              transition-opacity hover:opacity-80
              ${EVENT_CLASS}
            `}
            onClick={(e) => handleEventClick(e, event)}
            aria-label={event.title}
          >
            {!isAllDayEvent(event) && (
              <span className="mr-1 opacity-70">
                {new Intl.DateTimeFormat(locale, {
                  hour: "numeric",
                  minute: "2-digit",
                }).format(
                  new Date(
                    event.start.year,
                    event.start.month - 1,
                    event.start.day,
                    event.start.hour,
                    event.start.minute,
                  ),
                )}
              </span>
            )}
            {event.title}
          </button>
        ))}
        {overflowCount > 0 && (
          <button
            type="button"
            className="w-full text-left text-xs font-medium text-muted-foreground hover:text-foreground px-1.5"
          >
            +{overflowCount} more
          </button>
        )}
      </div>
    </div>
  );
}
