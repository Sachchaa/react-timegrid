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
    const result = getTimedEventsForDate([timedEvent, allDayEvent], new CalendarDate(2026, 4, 16));
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });
});

describe("getAllDayEventsForDate", () => {
  it("filters to only all-day events", () => {
    const result = getAllDayEventsForDate([timedEvent, allDayEvent], new CalendarDate(2026, 4, 16));
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });
});

describe("layoutTimedEvents", () => {
  const day = new CalendarDate(2026, 4, 16);

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
    const result = layoutTimedEvents(events, day);
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
    const result = layoutTimedEvents(events, day);
    expect(result).toHaveLength(2);
    expect(result[0].totalColumns).toBe(2);
    expect(result[0].column).not.toBe(result[1].column);
  });

  it("keeps non-overlapping events full width when other events overlap", () => {
    const events: TimedEvent[] = [
      {
        id: "standalone",
        title: "Standalone",
        start: new CalendarDateTime(2026, 4, 16, 9, 0),
        end: new CalendarDateTime(2026, 4, 16, 10, 0),
      },
      {
        id: "overlap-a",
        title: "Overlap A",
        start: new CalendarDateTime(2026, 4, 16, 15, 0),
        end: new CalendarDateTime(2026, 4, 16, 16, 30),
      },
      {
        id: "overlap-b",
        title: "Overlap B",
        start: new CalendarDateTime(2026, 4, 16, 15, 30),
        end: new CalendarDateTime(2026, 4, 16, 17, 0),
      },
    ];
    const result = layoutTimedEvents(events, day);
    const byId = (id: string) => result.find((p) => p.event.id === id)!;

    expect(byId("standalone").totalColumns).toBe(1);
    expect(byId("overlap-a").totalColumns).toBe(2);
    expect(byId("overlap-b").totalColumns).toBe(2);
    expect(byId("overlap-a").column).not.toBe(byId("overlap-b").column);
  });

  it("treats transitively-overlapping events as a single cluster", () => {
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
        start: new CalendarDateTime(2026, 4, 16, 9, 30),
        end: new CalendarDateTime(2026, 4, 16, 11, 0),
      },
      {
        id: "c",
        title: "C",
        start: new CalendarDateTime(2026, 4, 16, 10, 30),
        end: new CalendarDateTime(2026, 4, 16, 12, 0),
      },
    ];
    const result = layoutTimedEvents(events, day);
    expect(result.every((p) => p.totalColumns === 2)).toBe(true);
  });

  it("returns empty for no events", () => {
    expect(layoutTimedEvents([], day)).toHaveLength(0);
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
    const result = layoutTimedEvents(events, day, 0, 24);
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
    const result = layoutTimedEvents(events, day, 0, 24);
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
    const result = layoutTimedEvents(events, day, 8, 18);
    expect(result[0].top).toBe(0);
    expect(result[0].height).toBeGreaterThan(0);
  });

  it("renders an overnight timed event as a block on both days it spans", () => {
    const overnight: TimedEvent = {
      id: "overnight",
      title: "Red eye",
      start: new CalendarDateTime(2026, 4, 16, 22, 0),
      end: new CalendarDateTime(2026, 4, 17, 2, 0),
    };

    const startDay = layoutTimedEvents([overnight], new CalendarDate(2026, 4, 16), 0, 24);
    expect(startDay).toHaveLength(1);
    expect(startDay[0].top).toBeCloseTo((22 / 24) * 100, 5);
    expect(startDay[0].height).toBeCloseTo((2 / 24) * 100, 5);
    expect(startDay[0].top + startDay[0].height).toBeCloseTo(100, 5);

    const endDay = layoutTimedEvents([overnight], new CalendarDate(2026, 4, 17), 0, 24);
    expect(endDay).toHaveLength(1);
    expect(endDay[0].top).toBe(0);
    expect(endDay[0].height).toBeCloseTo((2 / 24) * 100, 5);
  });

  it("fills the window on a day fully spanned by a multi-day event", () => {
    const conference: TimedEvent = {
      id: "conf",
      title: "Conference",
      start: new CalendarDateTime(2026, 4, 16, 10, 0),
      end: new CalendarDateTime(2026, 4, 18, 14, 0),
    };
    const middleDay = layoutTimedEvents([conference], new CalendarDate(2026, 4, 17), 0, 24);
    expect(middleDay).toHaveLength(1);
    expect(middleDay[0].top).toBe(0);
    expect(middleDay[0].height).toBe(100);
  });

  it("omits an event ending exactly at midnight from the following day", () => {
    const event: TimedEvent = {
      id: "midnight",
      title: "Ends at midnight",
      start: new CalendarDateTime(2026, 4, 16, 22, 0),
      end: new CalendarDateTime(2026, 4, 17, 0, 0),
    };
    const nextDay = layoutTimedEvents([event], new CalendarDate(2026, 4, 17), 0, 24);
    expect(nextDay).toHaveLength(0);
  });
});
