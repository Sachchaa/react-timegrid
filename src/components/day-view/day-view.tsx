import { useMemo } from "react";
import { useCalendarContext } from "../../context/calendar-context";
import { useTimeGrid } from "../../hooks/use-time-grid";
import { TimeGrid } from "../shared/time-grid";
import type { DayColumn } from "../../hooks/use-time-grid";

export function DayView() {
  const { currentDate, events, locale, weekStartsOn } = useCalendarContext();
  const { columns: allColumns, timeSlots } = useTimeGrid({
    date: currentDate,
    events,
    weekStartsOn,
    locale,
  });

  const singleColumn: DayColumn[] = useMemo(() => {
    const match = allColumns.find(
      (col) => col.date.compare(currentDate) === 0,
    );
    return match ? [match] : allColumns.length > 0 ? [allColumns[0]] : [];
  }, [allColumns, currentDate]);

  return (
    <TimeGrid columns={singleColumn} timeSlots={timeSlots} showDayHeaders />
  );
}
