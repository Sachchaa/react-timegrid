import { useCallback } from "react";
import type { CalendarDate } from "@internationalized/date";
import { useCalendarContext } from "../../context/calendar-context";
import { getTimeSlotAriaLabel } from "../../utils/aria";

interface TimeSlotProps {
  date: CalendarDate;
  hour: number;
  minute: number;
}

export function TimeSlot({ date, hour, minute }: TimeSlotProps) {
  const { locale, onDateClick } = useCalendarContext();

  const handleClick = useCallback(() => {
    onDateClick?.(date);
  }, [onDateClick, date]);

  const isHourBoundary = minute === 30;

  return (
    // TODO(a11y): add keyboard handler + focusability; tracked under P1 keyboard-nav follow-up.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
    <div
      role="gridcell"
      aria-label={getTimeSlotAriaLabel(hour, locale, minute, 30)}
      className={`h-10 border-b transition-colors hover:bg-accent/40 cursor-pointer ${
        isHourBoundary ? "border-border" : "border-border/40"
      }`}
      onClick={handleClick}
    />
  );
}
