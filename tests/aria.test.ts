import { describe, it, expect } from "vitest";
import { CalendarDate } from "@internationalized/date";
import { getGridCellAriaLabel, getTimeSlotAriaLabel, getEventAriaLabel } from "../src/utils/aria";

describe("getGridCellAriaLabel", () => {
  const date = new CalendarDate(2026, 4, 16);

  it("returns just the date when no events", () => {
    expect(getGridCellAriaLabel(date, "en-US", 0)).toBe("Thursday, April 16, 2026");
  });

  it("uses singular 'event' for 1 event", () => {
    expect(getGridCellAriaLabel(date, "en-US", 1)).toMatch(/1 event$/);
  });

  it("uses plural 'events' for > 1 event", () => {
    expect(getGridCellAriaLabel(date, "en-US", 3)).toMatch(/3 events$/);
  });
});

describe("getTimeSlotAriaLabel", () => {
  it("renders a start-to-end range", () => {
    const label = getTimeSlotAriaLabel(9, "en-US");
    expect(label).toMatch(/9/);
    expect(label).toMatch(/10/);
    expect(label).toMatch(/to/);
  });
});

describe("getEventAriaLabel", () => {
  it("combines title and time range", () => {
    expect(getEventAriaLabel("Standup", "9:00 AM", "9:30 AM")).toBe("Standup, 9:00 AM to 9:30 AM");
  });
});
