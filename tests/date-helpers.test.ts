import { describe, it, expect } from "vitest";
import { CalendarDate, CalendarDateTime } from "@internationalized/date";
import {
  getStartOfWeek,
  getEndOfWeek,
  getWeekDays,
  getDaysInMonthGrid,
  getWeekDates,
  isDateInRange,
  getHourFromDateTime,
  getDayOfWeekIndex,
  formatMonthYear,
  formatDayHeader,
  formatHour,
} from "../src/utils/date-helpers";

describe("week boundaries", () => {
  it("getStartOfWeek respects sunday", () => {
    const start = getStartOfWeek(new CalendarDate(2026, 4, 16), "sunday");
    expect(start.toString()).toBe("2026-04-12");
  });

  it("getStartOfWeek respects monday", () => {
    const start = getStartOfWeek(new CalendarDate(2026, 4, 16), "monday");
    expect(start.toString()).toBe("2026-04-13");
  });

  it("getEndOfWeek matches week start", () => {
    const end = getEndOfWeek(new CalendarDate(2026, 4, 16), "sunday");
    expect(end.toString()).toBe("2026-04-18");
  });
});

describe("getWeekDays", () => {
  it("returns 7 weekday names", () => {
    expect(getWeekDays("sunday", "en-US")).toHaveLength(7);
  });
});

describe("getDaysInMonthGrid", () => {
  it("returns a grid aligned to week boundaries", () => {
    const days = getDaysInMonthGrid(new CalendarDate(2026, 4, 16), "sunday");
    expect(days.length % 7).toBe(0);
    expect(getDayOfWeekIndex(days[0], "sunday")).toBe(0);
  });

  it("includes all days of the current month", () => {
    const days = getDaysInMonthGrid(new CalendarDate(2026, 4, 16), "sunday");
    const inMonth = days.filter((d) => d.month === 4 && d.year === 2026);
    expect(inMonth).toHaveLength(30);
  });
});

describe("getWeekDates", () => {
  it("returns exactly 7 consecutive dates", () => {
    const week = getWeekDates(new CalendarDate(2026, 4, 16), "sunday");
    expect(week).toHaveLength(7);
    for (let i = 1; i < 7; i++) {
      expect(week[i].compare(week[i - 1])).toBe(1);
    }
  });
});

describe("isDateInRange", () => {
  const start = new CalendarDate(2026, 4, 10);
  const end = new CalendarDate(2026, 4, 20);

  it("treats start as inclusive", () => {
    expect(isDateInRange(start, start, end)).toBe(true);
  });

  it("treats end as inclusive", () => {
    expect(isDateInRange(end, start, end)).toBe(true);
  });

  it("returns false for dates outside the range", () => {
    expect(isDateInRange(new CalendarDate(2026, 4, 9), start, end)).toBe(false);
    expect(isDateInRange(new CalendarDate(2026, 4, 21), start, end)).toBe(false);
  });
});

describe("getHourFromDateTime", () => {
  it("converts hour and minute to fractional hours", () => {
    expect(getHourFromDateTime(new CalendarDateTime(2026, 4, 16, 9, 30))).toBe(9.5);
    expect(getHourFromDateTime(new CalendarDateTime(2026, 4, 16, 0, 0))).toBe(0);
    expect(getHourFromDateTime(new CalendarDateTime(2026, 4, 16, 23, 45))).toBeCloseTo(23.75);
  });
});

describe("formatters", () => {
  it("formatMonthYear renders localized month/year", () => {
    expect(formatMonthYear(new CalendarDate(2026, 4, 16), "en-US")).toBe("April 2026");
  });

  it("formatDayHeader includes weekday + day", () => {
    const label = formatDayHeader(new CalendarDate(2026, 4, 16), "en-US");
    expect(label).toMatch(/Thu/);
    expect(label).toMatch(/16/);
  });

  it("formatHour renders a numeric hour", () => {
    expect(formatHour(9, "en-US")).toMatch(/9/);
  });
});
