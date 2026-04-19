import { useMemo } from "react";
import { useCalendarContext } from "../context/calendar-context";
import { formatMonthYear, formatDayHeader, getStartOfWeek, getEndOfWeek } from "../utils/date-helpers";
import type { ViewMode } from "../types";

const VIEW_LABELS: Record<ViewMode, string> = {
  month: "Month",
  week: "Week",
  day: "Day",
};

const VIEWS: ViewMode[] = ["month", "week", "day"];

interface HeaderProps {
  onNext: () => void;
  onPrev: () => void;
  onToday: () => void;
}

export function Header({ onNext, onPrev, onToday }: HeaderProps) {
  const { view, currentDate, locale, weekStartsOn, onViewChange } =
    useCalendarContext();

  const title = useMemo(() => {
    switch (view) {
      case "month":
        return formatMonthYear(currentDate, locale);
      case "week": {
        const weekStart = getStartOfWeek(currentDate, weekStartsOn);
        const weekEnd = getEndOfWeek(currentDate, weekStartsOn);
        const startStr = new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric",
        }).format(
          new Date(weekStart.year, weekStart.month - 1, weekStart.day),
        );
        const endStr = new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(weekEnd.year, weekEnd.month - 1, weekEnd.day));
        return `${startStr} – ${endStr}`;
      }
      case "day":
        return formatDayHeader(currentDate, locale);
    }
  }, [view, currentDate, locale, weekStartsOn]);

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <h2
          className="text-lg font-semibold text-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToday}
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background"
        >
          Today
        </button>

        <div className="flex items-center rounded-md border border-input shadow-sm">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous"
            className="rounded-l-md bg-background px-2.5 py-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next"
            className="rounded-r-md border-l border-input bg-background px-2.5 py-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div className="flex rounded-md border border-input shadow-sm" role="tablist">
          {VIEWS.map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => onViewChange(v)}
              className={`
                px-3 py-1.5 text-sm font-medium first:rounded-l-md last:rounded-r-md
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring
                ${
                  view === v
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                }
                ${v !== "month" ? "border-l border-input" : ""}
              `}
            >
              {VIEW_LABELS[v]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
