import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { CalendarDate, CalendarDateTime } from "@internationalized/date";
import { useMonthGrid } from "../src/hooks/use-month-grid";
import type { CalendarEvent } from "../src/types";

describe("useMonthGrid", () => {
  const april2026 = new CalendarDate(2026, 4, 16);

  it("generates weeks for the month", () => {
    const { result } = renderHook(() =>
      useMonthGrid({ date: april2026, events: [], weekStartsOn: "sunday" }),
    );
    expect(result.current.weeks.length).toBeGreaterThanOrEqual(4);
    expect(result.current.weeks.length).toBeLessThanOrEqual(6);
  });

  it("each week has 7 days", () => {
    const { result } = renderHook(() =>
      useMonthGrid({ date: april2026, events: [], weekStartsOn: "sunday" }),
    );
    for (const week of result.current.weeks) {
      expect(week.days).toHaveLength(7);
    }
  });

  it("marks current month days correctly", () => {
    const { result } = renderHook(() =>
      useMonthGrid({ date: april2026, events: [], weekStartsOn: "sunday" }),
    );
    const allDays = result.current.weeks.flatMap((w) => w.days);
    const aprilDays = allDays.filter((d) => d.isCurrentMonth);
    expect(aprilDays).toHaveLength(30);
  });

  it("attaches events to correct dates", () => {
    const events: CalendarEvent[] = [
      {
        id: "1",
        title: "Test event",
        start: new CalendarDateTime(2026, 4, 16, 10, 0),
        end: new CalendarDateTime(2026, 4, 16, 11, 0),
        color: "blue",
      },
    ];
    const { result } = renderHook(() =>
      useMonthGrid({ date: april2026, events, weekStartsOn: "sunday" }),
    );
    const allDays = result.current.weeks.flatMap((w) => w.days);
    const april16 = allDays.find((d) => d.date.day === 16 && d.isCurrentMonth);
    expect(april16?.events).toHaveLength(1);
    expect(april16?.events[0].title).toBe("Test event");
  });

  it("respects monday start", () => {
    const { result } = renderHook(() =>
      useMonthGrid({ date: april2026, events: [], weekStartsOn: "monday" }),
    );
    const firstDay = result.current.weeks[0].days[0].date;
    const jsDate = new Date(firstDay.year, firstDay.month - 1, firstDay.day);
    expect(jsDate.getDay()).toBe(1);
  });
});
