import { useCalendarContext } from "../../context/calendar-context";
import { useTimeGrid } from "../../hooks/use-time-grid";
import { TimeGrid } from "../shared/time-grid";

export function WeekView() {
  const { currentDate, events, locale, weekStartsOn } = useCalendarContext();
  const { columns, timeSlots } = useTimeGrid({
    date: currentDate,
    events,
    weekStartsOn,
    locale,
  });

  return <TimeGrid columns={columns} timeSlots={timeSlots} showDayHeaders />;
}
