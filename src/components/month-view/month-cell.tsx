import { useCallback, useRef } from "react";
import type { MonthGridDay, CalendarEvent } from "../../types";
import { useCalendarContext } from "../../context/calendar-context";
import { getGridCellAriaLabel } from "../../utils/aria";
import { isAllDayEvent } from "../../utils/event-layout";

const MAX_VISIBLE_EVENTS = 3;

const EVENT_COLORS: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 border-l-blue-500",
  red: "bg-red-100 text-red-800 border-l-red-500",
  green: "bg-green-100 text-green-800 border-l-green-500",
  purple: "bg-purple-100 text-purple-800 border-l-purple-500",
  orange: "bg-orange-100 text-orange-800 border-l-orange-500",
  yellow: "bg-yellow-100 text-yellow-800 border-l-yellow-500",
  pink: "bg-pink-100 text-pink-800 border-l-pink-500",
  indigo: "bg-indigo-100 text-indigo-800 border-l-indigo-500",
};

const DEFAULT_COLOR = "bg-blue-100 text-blue-800 border-l-blue-500";

function getEventColorClass(color?: string): string {
  if (!color) return DEFAULT_COLOR;
  return EVENT_COLORS[color] ?? DEFAULT_COLOR;
}

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
        min-h-28 border-b border-r border-gray-200 p-1.5 cursor-pointer
        transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2
        focus:ring-blue-500 focus:ring-inset
        ${!day.isCurrentMonth ? "bg-gray-50/50" : "bg-white"}
      `}
      onClick={handleDateClick}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
    >
      <span
        className={`
          inline-flex h-7 w-7 items-center justify-center rounded-full text-sm
          ${day.isToday ? "bg-blue-600 font-semibold text-white" : ""}
          ${!day.isCurrentMonth ? "text-gray-400" : "text-gray-900"}
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
              ${getEventColorClass(event.color)}
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
            className="w-full text-left text-xs font-medium text-gray-500 hover:text-gray-700 px-1.5"
          >
            +{overflowCount} more
          </button>
        )}
      </div>
    </div>
  );
}
