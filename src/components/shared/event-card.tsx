import { useCallback } from "react";
import type { PositionedEvent } from "../../types";
import { useCalendarContext } from "../../context/calendar-context";
import { isTimedEvent } from "../../utils/event-layout";

const EVENT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: "bg-blue-100", border: "border-l-blue-500", text: "text-blue-800" },
  red: { bg: "bg-red-100", border: "border-l-red-500", text: "text-red-800" },
  green: { bg: "bg-green-100", border: "border-l-green-500", text: "text-green-800" },
  purple: { bg: "bg-purple-100", border: "border-l-purple-500", text: "text-purple-800" },
  orange: { bg: "bg-orange-100", border: "border-l-orange-500", text: "text-orange-800" },
  yellow: { bg: "bg-yellow-100", border: "border-l-yellow-500", text: "text-yellow-800" },
  pink: { bg: "bg-pink-100", border: "border-l-pink-500", text: "text-pink-800" },
  indigo: { bg: "bg-indigo-100", border: "border-l-indigo-500", text: "text-indigo-800" },
};

const DEFAULT_COLORS = { bg: "bg-blue-100", border: "border-l-blue-500", text: "text-blue-800" };

interface EventCardProps {
  positioned: PositionedEvent;
}

export function EventCard({ positioned }: EventCardProps) {
  const { locale, onEventClick } = useCalendarContext();
  const { event, top, height, column, totalColumns } = positioned;
  const colors = EVENT_COLORS[event.color ?? "blue"] ?? DEFAULT_COLORS;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onEventClick?.(event);
    },
    [onEventClick, event],
  );

  const widthPercent = 100 / totalColumns;
  const leftPercent = column * widthPercent;

  const timeLabel =
    isTimedEvent(event)
      ? new Intl.DateTimeFormat(locale, {
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
        )
      : "";

  return (
    <button
      type="button"
      className={`
        absolute overflow-hidden rounded border-l-2 px-1.5 py-0.5
        text-left text-xs transition-opacity hover:opacity-90
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${colors.bg} ${colors.border} ${colors.text}
      `}
      style={{
        top: `${top}%`,
        height: `${Math.max(height, 1.5)}%`,
        left: `${leftPercent}%`,
        width: `calc(${widthPercent}% - 4px)`,
        zIndex: 10 + column,
      }}
      onClick={handleClick}
      aria-label={`${event.title}${timeLabel ? `, ${timeLabel}` : ""}`}
    >
      <span className="block truncate font-medium">{event.title}</span>
      {timeLabel && height > 3 && (
        <span className="block truncate opacity-75">{timeLabel}</span>
      )}
    </button>
  );
}
