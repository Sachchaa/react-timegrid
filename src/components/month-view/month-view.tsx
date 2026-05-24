import { useState, useCallback } from "react";
import { useCalendarContext } from "../../context/calendar-context";
import { useMonthGrid } from "../../hooks/use-month-grid";
import { getWeekDays } from "../../utils/date-helpers";
import { MonthCell } from "./month-cell";

export function MonthView() {
  const { currentDate, events, locale, weekStartsOn } = useCalendarContext();
  const { weeks } = useMonthGrid({ date: currentDate, events, weekStartsOn });
  const weekDays = getWeekDays(weekStartsOn, locale);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const totalCells = weeks.length * 7;
  // Months span 4–6 weeks, so a stored index can point past the end of a
  // shorter month after navigation. Clamp it so exactly one cell always keeps
  // tabIndex 0 and the grid never loses its keyboard tab stop.
  const activeIndex = Math.min(focusedIndex, totalCells - 1);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let nextIndex = activeIndex;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          nextIndex = Math.min(activeIndex + 1, totalCells - 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          nextIndex = Math.max(activeIndex - 1, 0);
          break;
        case "ArrowDown":
          e.preventDefault();
          nextIndex = Math.min(activeIndex + 7, totalCells - 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          nextIndex = Math.max(activeIndex - 7, 0);
          break;
        case "Home":
          e.preventDefault();
          nextIndex = Math.floor(activeIndex / 7) * 7;
          break;
        case "End":
          e.preventDefault();
          nextIndex = Math.floor(activeIndex / 7) * 7 + 6;
          break;
        default:
          return;
      }

      setFocusedIndex(nextIndex);
      const weekIdx = Math.floor(nextIndex / 7);
      const dayIdx = nextIndex % 7;
      const cell = document.querySelector(
        `[data-cell-index="${weekIdx}-${dayIdx}"]`
      ) as HTMLElement | null;
      cell?.focus();
    },
    [activeIndex, totalCells]
  );

  return (
    <div
      role="grid"
      aria-label="Calendar"
      tabIndex={-1}
      className="overflow-hidden rounded-lg border border-border bg-card focus:outline-none"
      onKeyDown={handleKeyDown}
    >
      <div role="row" className="grid grid-cols-7 border-b border-border bg-muted">
        {weekDays.map((day) => (
          <div
            key={day}
            role="columnheader"
            className="px-2 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {weeks.map((week, weekIdx) => (
        <div key={week.weekNumber} role="row" className="grid grid-cols-7">
          {week.days.map((day, dayIdx) => {
            const cellIndex = weekIdx * 7 + dayIdx;
            return (
              <MonthCell
                key={day.date.toString()}
                day={day}
                tabIndex={cellIndex === activeIndex ? 0 : -1}
                onFocus={() => setFocusedIndex(cellIndex)}
                data-cell-index={`${weekIdx}-${dayIdx}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
