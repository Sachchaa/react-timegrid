import type { AllDayEvent } from "../../types";
import { useCalendarContext } from "../../context/calendar-context";

interface AllDayRowProps {
  events: AllDayEvent[];
}

export function AllDayRow({ events }: AllDayRowProps) {
  const { onEventClick } = useCalendarContext();

  if (events.length === 0) return null;

  return (
    <div className="flex flex-col gap-0.5 px-1 py-1">
      {events.map((event) => (
        <button
          key={event.id}
          type="button"
          className="flex h-8 w-full items-center truncate rounded border-l-2 border-l-primary bg-accent px-2 text-left text-xs font-medium text-accent-foreground transition-opacity hover:opacity-80"
          onClick={() => onEventClick?.(event)}
          aria-label={event.title}
        >
          <span className="truncate">{event.title}</span>
        </button>
      ))}
    </div>
  );
}
