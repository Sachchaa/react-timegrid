import type { AllDayEvent } from "../../types";
import { useCalendarContext } from "../../context/calendar-context";

interface AllDayRowProps {
  events: AllDayEvent[];
}

const EVENT_COLORS: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800",
  red: "bg-red-100 text-red-800",
  green: "bg-green-100 text-green-800",
  purple: "bg-purple-100 text-purple-800",
  orange: "bg-orange-100 text-orange-800",
  yellow: "bg-yellow-100 text-yellow-800",
  pink: "bg-pink-100 text-pink-800",
  indigo: "bg-indigo-100 text-indigo-800",
};

const DEFAULT_COLOR = "bg-blue-100 text-blue-800";

export function AllDayRow({ events }: AllDayRowProps) {
  const { onEventClick } = useCalendarContext();

  if (events.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 px-1 py-1">
      {events.map((event) => (
        <button
          key={event.id}
          type="button"
          className={`truncate rounded px-2 py-0.5 text-xs font-medium transition-opacity hover:opacity-80 ${EVENT_COLORS[event.color ?? "blue"] ?? DEFAULT_COLOR}`}
          onClick={() => onEventClick?.(event)}
          aria-label={event.title}
        >
          {event.title}
        </button>
      ))}
    </div>
  );
}
