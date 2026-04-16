import { useEffect, useRef, useState } from "react";
import type { CalendarEvent } from "../../types";
import { isTimedEvent } from "../../utils/event-layout";

interface EventPopoverProps {
  event: CalendarEvent | null;
  anchorRect: DOMRect | null;
  onClose: () => void;
}

export function EventPopover({ event, anchorRect, onClose }: EventPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!anchorRect) return;

    const top = anchorRect.bottom + 8;
    const left = anchorRect.left + anchorRect.width / 2 - 150;

    setPosition({
      top: Math.max(8, top),
      left: Math.max(8, left),
    });
  }, [anchorRect]);

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
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(dt.year, dt.month - 1, dt.day, dt.hour, dt.minute));
  };

  const formatDate = (dt: { year: number; month: number; day: number }) => {
    return new Intl.DateTimeFormat("en-US", {
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
      className="fixed z-50 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
      style={{ top: position.top, left: position.left }}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{event.title}</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-0.5 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-500">
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
            <p className="mt-1 font-medium text-gray-600">All day</p>
          </>
        )}
      </div>
    </div>
  );
}
