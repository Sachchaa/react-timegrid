import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { CalendarDate, CalendarDateTime } from "@internationalized/date";
import { Calendar } from "../src/components/calendar";
import type { CalendarEvent } from "../src/types";

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Team standup",
    start: new CalendarDateTime(2026, 4, 16, 9, 0),
    end: new CalendarDateTime(2026, 4, 16, 9, 30),
    color: "blue",
  },
  {
    id: "2",
    title: "Conference",
    start: new CalendarDate(2026, 4, 20),
    end: new CalendarDate(2026, 4, 22),
    allDay: true,
    color: "red",
  },
];

describe("axe accessibility", () => {
  it("month view has no detectable a11y violations", async () => {
    const { container } = render(
      <Calendar defaultView="month" defaultValue={new CalendarDate(2026, 4, 16)} events={events} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("week view has no detectable a11y violations", async () => {
    const { container } = render(
      <Calendar defaultView="week" defaultValue={new CalendarDate(2026, 4, 16)} events={events} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("day view has no detectable a11y violations", async () => {
    const { container } = render(
      <Calendar defaultView="day" defaultValue={new CalendarDate(2026, 4, 16)} events={events} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
