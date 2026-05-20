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
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      {showDayHeaders && (
        <div
          className="grid border-b border-border bg-muted"
          style={{ gridTemplateColumns: `4.5rem repeat(${columns.length}, 1fr)` }}
        >
          <div className="border-r border-border" />
          {columns.map((col) => {
            const isToday = isSameDay(col.date, todayDate);
            const dayName = new Intl.DateTimeFormat(displayLocale, { weekday: "short" }).format(
              new Date(col.date.year, col.date.month - 1, col.date.day)
            );
            return (
              <div
                key={col.date.toString()}
                className={`flex flex-col items-center py-2 text-center ${
                  columns.length > 1 ? "border-r border-border last:border-r-0" : ""
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {dayName}
                </span>
                <span
                  className={`mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    isToday ? "bg-primary text-primary-foreground" : "text-foreground"
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
          className="grid border-b border-border bg-muted/50"
          style={{ gridTemplateColumns: `4.5rem repeat(${columns.length}, 1fr)` }}
        >
          <div className="flex items-center justify-center border-r border-border px-1 text-xs text-muted-foreground">
            All day
          </div>
          {columns.map((col) => (
            <div
              key={`allday-${col.date.toString()}`}
              className={`min-h-10 min-w-0 overflow-hidden ${columns.length > 1 ? "border-r border-border last:border-r-0" : ""}`}
            >
              <AllDayRow events={col.allDayEvents} />
            </div>
          ))}
        </div>
      )}

      <div className="max-h-[800px] overflow-y-auto" role="region" aria-label="Time grid">
        <div
          className="grid"
          style={{ gridTemplateColumns: `4.5rem repeat(${columns.length}, 1fr)` }}
        >
          <div className="relative">
            {timeSlots.map((slot, idx) => {
              const isHourBoundary = slot.minute === 30;
              return (
                <div
                  key={`${slot.hour}-${slot.minute}`}
                  className={`flex h-10 items-start justify-end border-b pr-2 ${
                    isHourBoundary ? "border-border" : "border-border/40"
                  }`}
                >
                  {slot.label && (
                    <span
                      className={`${idx === 0 ? "mt-1" : "-mt-1.5"} whitespace-nowrap bg-card px-0.5 text-xs text-muted-foreground`}
                    >
                      {slot.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {columns.map((col) => (
            <div
              key={col.date.toString()}
              className={`relative ${columns.length > 1 ? "border-r border-border last:border-r-0" : ""}`}
            >
              {timeSlots.map((slot) => (
                <TimeSlot
                  key={`${col.date.toString()}-${slot.hour}-${slot.minute}`}
                  date={col.date}
                  hour={slot.hour}
                  minute={slot.minute}
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
