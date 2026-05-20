/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { CalendarDate, CalendarDateTime } from "@internationalized/date";
import { Calendar } from "../src/components/calendar";
import type { CalendarEvent } from "../src/types";

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Standup",
    start: new CalendarDateTime(2026, 4, 16, 9, 0),
    end: new CalendarDateTime(2026, 4, 16, 9, 30),
  },
];

describe("server-side rendering", () => {
  it("renders to HTML in a node environment without touching window/document", () => {
    expect(() => {
      const html = renderToString(
        <Calendar
          defaultView="month"
          defaultValue={new CalendarDate(2026, 4, 16)}
          events={events}
        />
      );
      expect(html).toContain("April 2026");
      expect(html).toContain("Standup");
    }).not.toThrow();
  });

  it("renders week view without touching window/document", () => {
    expect(() => {
      renderToString(
        <Calendar defaultView="week" defaultValue={new CalendarDate(2026, 4, 16)} events={events} />
      );
    }).not.toThrow();
  });
});
