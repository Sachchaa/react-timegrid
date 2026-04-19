import { useCallback } from "react";
import type { CalendarDate } from "@internationalized/date";
import { useCalendarContext } from "../../context/calendar-context";
import { getTimeSlotAriaLabel } from "../../utils/aria";

interface TimeSlotProps {
  date: CalendarDate;
  hour: number;
}

export function TimeSlot({ date, hour }: TimeSlotProps) {
  const { locale, onDateClick } = useCalendarContext();

  const handleClick = useCallback(() => {
    onDateClick?.(date);
  }, [onDateClick, date]);

  return (
    <div
      role="gridcell"
      aria-label={getTimeSlotAriaLabel(hour, locale)}
      className="h-12 border-b border-border transition-colors hover:bg-accent/40 cursor-pointer"
      onClick={handleClick}
    />
  );
}
