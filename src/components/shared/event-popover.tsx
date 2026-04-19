import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CalendarEvent } from "../../types";
import { useCalendarContext } from "../../context/calendar-context";
import { isTimedEvent } from "../../utils/event-layout";

const VIEWPORT_MARGIN = 8;
const FALLBACK_WIDTH = 288;
const FALLBACK_HEIGHT = 160;

interface EventPopoverProps {
  event: CalendarEvent | null;
  anchorRect: DOMRect | null;
  onClose: () => void;
}

export function EventPopover({ event, anchorRect, onClose }: EventPopoverProps) {
  const { locale } = useCalendarContext();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(
    null,
  );

  useLayoutEffect(() => {
    if (!anchorRect || !event) {
      setPosition(null);
      return;
    }

    const el = popoverRef.current;
    const width = el?.offsetWidth ?? FALLBACK_WIDTH;
    const height = el?.offsetHeight ?? FALLBACK_HEIGHT;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = anchorRect.bottom + VIEWPORT_MARGIN;
    if (top + height + VIEWPORT_MARGIN > viewportHeight) {
      const flipped = anchorRect.top - height - VIEWPORT_MARGIN;
      top = flipped >= VIEWPORT_MARGIN
        ? flipped
        : Math.max(VIEWPORT_MARGIN, viewportHeight - height - VIEWPORT_MARGIN);
    }

    let left = anchorRect.left + anchorRect.width / 2 - width / 2;
    left = Math.max(
      VIEWPORT_MARGIN,
      Math.min(left, viewportWidth - width - VIEWPORT_MARGIN),
    );

    setPosition({ top, left });
  }, [anchorRect, event]);

  useEffect(() => {
    if (!event) return;

    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [event, onClose]);

  if (!event || !anchorRect) return null;

  const formatTime = (dt: { year: number; month: number; day: number; hour: number; minute: number }) => {
    return new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(dt.year, dt.month - 1, dt.day, dt.hour, dt.minute));
  };

  const formatDate = (dt: { year: number; month: number; day: number }) => {
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date(dt.year, dt.month - 1, dt.day));
  };

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label={`Event details: ${event.title}`}
      className="fixed z-50 w-72 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg"
      style={{
        top: position?.top ?? 0,
        left: position?.left ?? 0,
        visibility: position ? "visible" : "hidden",
      }}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-foreground">{event.title}</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-0.5 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-2 text-xs text-muted-foreground">
        {isTimedEvent(event) ? (
          <>
            <p>{formatDate(event.start)}</p>
            <p>
              {formatTime(event.start)} – {formatTime(event.end)}
            </p>
          </>
        ) : (
          <>
            <p>{formatDate(event.start)}</p>
            {event.start.compare(event.end) !== 0 && (
              <p>to {formatDate(event.end)}</p>
            )}
            <p className="mt-1 font-medium text-foreground">All day</p>
          </>
        )}
      </div>
    </div>
  );
}
