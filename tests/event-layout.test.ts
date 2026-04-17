import { describe, it, expect } from "vitest";
import { CalendarDate, CalendarDateTime } from "@internationalized/date";
import {
  getEventsForDate,
  getTimedEventsForDate,
  getAllDayEventsForDate,
  layoutTimedEvents,
  isAllDayEvent,
  isTimedEvent,
} from "../src/utils/event-layout";
import type { CalendarEvent, TimedEvent, AllDayEvent } from "../src/types";

const timedEvent: TimedEvent = {
  id: "1",
  title: "Meeting",
  start: new CalendarDateTime(2026, 4, 16, 10, 0),
  end: new CalendarDateTime(2026, 4, 16, 11, 0),
};

const allDayEvent: AllDayEvent = {
  id: "2",
  title: "Conference",
  start: new CalendarDate(2026, 4, 15),
  end: new CalendarDate(2026, 4, 17),
  allDay: true,
};

describe("event type guards", () => {
  it("identifies timed events", () => {
    expect(isTimedEvent(timedEvent)).toBe(true);
    expect(isTimedEvent(allDayEvent)).toBe(false);
  });

  it("identifies all-day events", () => {
    expect(isAllDayEvent(allDayEvent)).toBe(true);
    expect(isAllDayEvent(timedEvent)).toBe(false);
  });
});

describe("getEventsForDate", () => {
  const events: CalendarEvent[] = [timedEvent, allDayEvent];

  it("returns timed event on its date", () => {
    const result = getEventsForDate(events, new CalendarDate(2026, 4, 16));
    expect(result).toHaveLength(2);
  });

  it("returns all-day event spanning multiple days", () => {
    const result = getEventsForDate(events, new CalendarDate(2026, 4, 15));
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("returns empty for dates with no events", () => {
    const result = getEventsForDate(events, new CalendarDate(2026, 4, 20));
    expect(result).toHaveLength(0);
  });
});

describe("getTimedEventsForDate", () => {
  it("filters to only timed events", () => {
    const result = getTimedEventsForDate(
      [timedEvent, allDayEvent],
      new CalendarDate(2026, 4, 16),
    );
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });
});

describe("getAllDayEventsForDate", () => {
  it("filters to only all-day events", () => {
    const result = getAllDayEventsForDate(
      [timedEvent, allDayEvent],
      new CalendarDate(2026, 4, 16),
    );
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });
});

describe("layoutTimedEvents", () => {
  it("positions non-overlapping events in one column", () => {
    const events: TimedEvent[] = [
      {
        id: "a",
        title: "A",
        start: new CalendarDateTime(2026, 4, 16, 9, 0),
        end: new CalendarDateTime(2026, 4, 16, 10, 0),
      },
      {
        id: "b",
        title: "B",
        start: new CalendarDateTime(2026, 4, 16, 11, 0),
        end: new CalendarDateTime(2026, 4, 16, 12, 0),
      },
    ];
    const result = layoutTimedEvents(events);
    expect(result).toHaveLength(2);
    expect(result[0].totalColumns).toBe(1);
    expect(result[1].totalColumns).toBe(1);
  });

  it("places overlapping events in separate columns", () => {
    const events: TimedEvent[] = [
      {
        id: "a",
        title: "A",
        start: new CalendarDateTime(2026, 4, 16, 10, 0),
        end: new CalendarDateTime(2026, 4, 16, 12, 0),
      },
      {
        id: "b",
        title: "B",
        start: new CalendarDateTime(2026, 4, 16, 11, 0),
        end: new CalendarDateTime(2026, 4, 16, 13, 0),
      },
    ];
    const result = layoutTimedEvents(events);
    expect(result).toHaveLength(2);
    expect(result[0].totalColumns).toBe(2);
    expect(result[0].column).not.toBe(result[1].column);
  });

  it("returns empty for no events", () => {
    expect(layoutTimedEvents([])).toHaveLength(0);
  });

  it("calculates top and height as percentages", () => {
    const events: TimedEvent[] = [
      {
        id: "a",
        title: "A",
        start: new CalendarDateTime(2026, 4, 16, 12, 0),
        end: new CalendarDateTime(2026, 4, 16, 13, 0),
      },
    ];
    const result = layoutTimedEvents(events, 0, 24);
    expect(result[0].top).toBeCloseTo(50, 0);
    const expectedHeight = (60 / (24 * 60)) * 100;
    expect(result[0].height).toBeCloseTo(expectedHeight, 1);
  });

  it("clamps events that extend past the visible day boundary", () => {
    const events: TimedEvent[] = [
      {
        id: "late",
        title: "Late",
        start: new CalendarDateTime(2026, 4, 16, 23, 0),
        end: new CalendarDateTime(2026, 4, 16, 23, 59),
      },
    ];
    const result = layoutTimedEvents(events, 0, 24);
    expect(result[0].top + result[0].height).toBeLessThanOrEqual(100);
  });

  it("clamps events that start before the visible window", () => {
    const events: TimedEvent[] = [
      {
        id: "early",
        title: "Early",
        start: new CalendarDateTime(2026, 4, 16, 6, 0),
        end: new CalendarDateTime(2026, 4, 16, 10, 0),
      },
    ];
    const result = layoutTimedEvents(events, 8, 18);
    expect(result[0].top).toBe(0);
    expect(result[0].height).toBeGreaterThan(0);
  });
});
