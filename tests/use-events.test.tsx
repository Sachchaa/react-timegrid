import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { CalendarDate, CalendarDateTime } from "@internationalized/date";
import { useEvents } from "../src/hooks/use-events";
import type { CalendarEvent } from "../src/types";

const events: CalendarEvent[] = [
  {
    id: "t1",
    title: "Standup",
    start: new CalendarDateTime(2026, 4, 16, 9, 0),
    end: new CalendarDateTime(2026, 4, 16, 9, 30),
  },
  {
    id: "a1",
    title: "Conference",
    start: new CalendarDate(2026, 4, 15),
    end: new CalendarDate(2026, 4, 17),
    allDay: true,
  },
];

describe("useEvents", () => {
  it("partitions timed and all-day events for the date", () => {
    const { result } = renderHook(() =>
      useEvents({ events, date: new CalendarDate(2026, 4, 16) }),
    );
    expect(result.current.allEvents).toHaveLength(2);
    expect(result.current.timedEvents).toHaveLength(1);
    expect(result.current.allDayEvents).toHaveLength(1);
    expect(result.current.timedEvents[0].id).toBe("t1");
    expect(result.current.allDayEvents[0].id).toBe("a1");
  });

  it("returns empty arrays for a date with no events", () => {
    const { result } = renderHook(() =>
      useEvents({ events, date: new CalendarDate(2026, 5, 1) }),
    );
    expect(result.current.allEvents).toHaveLength(0);
    expect(result.current.timedEvents).toHaveLength(0);
    expect(result.current.allDayEvents).toHaveLength(0);
  });

  it("memoizes by events and date reference", () => {
    const date = new CalendarDate(2026, 4, 16);
    const { result, rerender } = renderHook(
      ({ d }: { d: CalendarDate }) => useEvents({ events, date: d }),
      { initialProps: { d: date } },
    );
    const first = result.current;
    rerender({ d: date });
    expect(result.current).toBe(first);
  });
});
