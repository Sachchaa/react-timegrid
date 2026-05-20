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
    <button
      type="button"
      aria-label={getTimeSlotAriaLabel(hour, locale, minute, 30)}
      className={`block h-10 w-full border-b text-left transition-colors hover:bg-accent/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset ${
        isHourBoundary ? "border-border" : "border-border/40"
      }`}
      onClick={handleClick}
    />
  );
}
