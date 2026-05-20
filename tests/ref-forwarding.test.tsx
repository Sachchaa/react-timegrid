import { describe, it, expect } from "vitest";
import { createRef } from "react";
import { render } from "@testing-library/react";
import { CalendarDate } from "@internationalized/date";
import { Calendar } from "../src/components/calendar";

describe("Calendar ref forwarding", () => {
  it("forwards a ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Calendar ref={ref} defaultValue={new CalendarDate(2026, 4, 16)} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("the ref's element wraps the calendar markup", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Calendar ref={ref} defaultValue={new CalendarDate(2026, 4, 16)} />);
    expect(ref.current?.textContent).toContain("April 2026");
  });
});
