import { useCallback } from "react";
import type { PositionedEvent } from "../../types";
import { useCalendarContext } from "../../context/calendar-context";
import { isTimedEvent } from "../../utils/event-layout";
import { getEventColorStyle } from "../../utils/event-color";

interface EventCardProps {
  positioned: PositionedEvent;
}

export function EventCard({ positioned }: EventCardProps) {
  const { locale, onEventClick } = useCalendarContext();
  const { event, top, height, column, totalColumns } = positioned;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onEventClick?.(event, e.currentTarget.getBoundingClientRect());
    },
    [onEventClick, event]
  );

  const safeTotalColumns = Math.max(totalColumns, 1);
  const widthPercent = 100 / safeTotalColumns;
  const leftPercent = column * widthPercent;

  const timeLabel = isTimedEvent(event)
    ? new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit",
      }).format(
        new Date(
          event.start.year,
          event.start.month - 1,
          event.start.day,
          event.start.hour,
          event.start.minute
        )
      )
    : "";

  const displayTitle = event.title || "Untitled event";
  const ariaLabel = `${displayTitle}${timeLabel ? `, ${timeLabel}` : ""}`;

  return (
    <button
      type="button"
      className="absolute overflow-hidden rounded border-l-2 border-l-primary bg-accent px-1.5 py-0.5 text-left text-xs text-accent-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
      style={{
        top: `${top}%`,
        height: `${Math.max(height, 1.5)}%`,
        left: `${leftPercent}%`,
        width: `calc(${widthPercent}% - 4px)`,
        zIndex: 10 + column,
        ...getEventColorStyle(event),
      }}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      <span className="block truncate font-medium">{displayTitle}</span>
      {timeLabel && height > 3 && <span className="block truncate opacity-75">{timeLabel}</span>}
    </button>
  );
}
