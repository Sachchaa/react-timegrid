import type { TimeSlot as TimeSlotType, AllDayEvent, PositionedEvent } from "../../types";
import type { CalendarDate } from "@internationalized/date";
import { useCalendarContext } from "../../context/calendar-context";
import { isSameDay, today, getLocalTimeZone } from "../../utils/date-helpers";
import { TimeSlot } from "./time-slot";
import { EventCard } from "./event-card";
import { AllDayRow } from "./all-day-row";

interface TimeGridColumn {
  date: CalendarDate;
  positionedEvents: PositionedEvent[];
  allDayEvents: AllDayEvent[];
}

interface TimeGridProps {
  columns: TimeGridColumn[];
  timeSlots: TimeSlotType[];
  showDayHeaders?: boolean;
  dayHeaderLocale?: string;
}

export function TimeGrid({
  columns,
  timeSlots,
  showDayHeaders = true,
  dayHeaderLocale,
}: TimeGridProps) {
  const { locale } = useCalendarContext();
  const displayLocale = dayHeaderLocale ?? locale;
  const todayDate = today(getLocalTimeZone());

  const hasAnyAllDayEvents = columns.some((col) => col.allDayEvents.length > 0);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
      {showDayHeaders && (
        <div className="grid border-b border-gray-200 bg-gray-50" style={{ gridTemplateColumns: `4rem repeat(${columns.length}, 1fr)` }}>
          <div className="border-r border-gray-200" />
          {columns.map((col) => {
            const isToday = isSameDay(col.date, todayDate);
            const dayName = new Intl.DateTimeFormat(displayLocale, { weekday: "short" }).format(
              new Date(col.date.year, col.date.month - 1, col.date.day),
            );
            return (
              <div
                key={col.date.toString()}
                className={`flex flex-col items-center py-2 text-center ${
                  columns.length > 1 ? "border-r border-gray-200 last:border-r-0" : ""
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {dayName}
                </span>
                <span
                  className={`mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    isToday ? "bg-blue-600 text-white" : "text-gray-900"
                  }`}
                >
                  {col.date.day}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {hasAnyAllDayEvents && (
        <div
          className="grid border-b border-gray-200 bg-gray-50/50"
          style={{ gridTemplateColumns: `4rem repeat(${columns.length}, 1fr)` }}
        >
          <div className="flex items-center justify-center border-r border-gray-200 px-1 text-xs text-gray-400">
            All day
          </div>
          {columns.map((col) => (
            <div
              key={`allday-${col.date.toString()}`}
              className={`min-h-8 ${columns.length > 1 ? "border-r border-gray-200 last:border-r-0" : ""}`}
            >
              <AllDayRow events={col.allDayEvents} />
            </div>
          ))}
        </div>
      )}

      <div className="max-h-[600px] overflow-y-auto" role="grid" aria-label="Time grid">
        <div
          className="grid"
          style={{ gridTemplateColumns: `4rem repeat(${columns.length}, 1fr)` }}
        >
          <div className="relative">
            {timeSlots.map((slot) => (
              <div
                key={slot.hour}
                className="flex h-12 items-start justify-end border-b border-gray-100 pr-2"
              >
                <span className="-mt-1.5 text-xs text-gray-400">{slot.label}</span>
              </div>
            ))}
          </div>

          {columns.map((col) => (
            <div
              key={col.date.toString()}
              className={`relative ${columns.length > 1 ? "border-r border-gray-200 last:border-r-0" : ""}`}
            >
              {timeSlots.map((slot) => (
                <TimeSlot
                  key={`${col.date.toString()}-${slot.hour}`}
                  date={col.date}
                  hour={slot.hour}
                />
              ))}

              <div className="pointer-events-none absolute inset-0">
                <div className="pointer-events-auto relative h-full">
                  {col.positionedEvents.map((pe) => (
                    <EventCard key={pe.event.id} positioned={pe} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
