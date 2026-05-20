import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

describe("Calendar component", () => {
  it("renders month view by default", () => {
    render(<Calendar defaultValue={new CalendarDate(2026, 4, 16)} events={events} />);
    expect(screen.getByText("April 2026")).toBeInTheDocument();
  });

  it("renders header with navigation controls", () => {
    render(<Calendar defaultValue={new CalendarDate(2026, 4, 16)} events={events} />);
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous")).toBeInTheDocument();
    expect(screen.getByLabelText("Next")).toBeInTheDocument();
  });

  it("renders view switcher tabs", () => {
    render(<Calendar defaultValue={new CalendarDate(2026, 4, 16)} events={events} />);
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Week")).toBeInTheDocument();
    expect(screen.getByText("Day")).toBeInTheDocument();
  });

  it("shows events in month view", () => {
    render(<Calendar defaultValue={new CalendarDate(2026, 4, 16)} events={events} />);
    expect(screen.getByText("Team standup")).toBeInTheDocument();
  });

  it("navigates to next month", () => {
    render(<Calendar defaultValue={new CalendarDate(2026, 4, 16)} events={events} />);
    fireEvent.click(screen.getByLabelText("Next"));
    expect(screen.getByText("May 2026")).toBeInTheDocument();
  });

  it("navigates to previous month", () => {
    render(<Calendar defaultValue={new CalendarDate(2026, 4, 16)} events={events} />);
    fireEvent.click(screen.getByLabelText("Previous"));
    expect(screen.getByText("March 2026")).toBeInTheDocument();
  });

  it("switches to week view", () => {
    render(<Calendar defaultValue={new CalendarDate(2026, 4, 16)} events={events} />);
    fireEvent.click(screen.getByText("Week"));
    expect(screen.getByRole("region", { name: "Time grid" })).toBeInTheDocument();
  });

  it("switches to day view", () => {
    render(<Calendar defaultValue={new CalendarDate(2026, 4, 16)} events={events} />);
    fireEvent.click(screen.getByText("Day"));
    expect(screen.getByRole("region", { name: "Time grid" })).toBeInTheDocument();
  });

  it("calls onEventClick when event is clicked", () => {
    const onEventClick = vi.fn();
    render(
      <Calendar
        defaultValue={new CalendarDate(2026, 4, 16)}
        events={events}
        onEventClick={onEventClick}
      />
    );
    fireEvent.click(screen.getByText("Team standup"));
    expect(onEventClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1", title: "Team standup" })
    );
  });

  it("calls onViewChange when view is switched", () => {
    const onViewChange = vi.fn();
    render(
      <Calendar
        defaultValue={new CalendarDate(2026, 4, 16)}
        events={events}
        onViewChange={onViewChange}
      />
    );
    fireEvent.click(screen.getByText("Week"));
    expect(onViewChange).toHaveBeenCalledWith("week");
  });

  it("respects controlled view prop", () => {
    const { rerender } = render(
      <Calendar value={new CalendarDate(2026, 4, 16)} view="month" events={events} />
    );
    expect(screen.getByText("April 2026")).toBeInTheDocument();
    rerender(<Calendar value={new CalendarDate(2026, 4, 16)} view="day" events={events} />);
    expect(screen.getByRole("region", { name: "Time grid" })).toBeInTheDocument();
  });

  it("warns on duplicate event ids", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Calendar
        defaultValue={new CalendarDate(2026, 4, 16)}
        events={[
          {
            id: "dup",
            title: "First",
            start: new CalendarDateTime(2026, 4, 16, 9, 0),
            end: new CalendarDateTime(2026, 4, 16, 10, 0),
          },
          {
            id: "dup",
            title: "Second",
            start: new CalendarDateTime(2026, 4, 16, 11, 0),
            end: new CalendarDateTime(2026, 4, 16, 12, 0),
          },
        ]}
      />
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('"dup"'));
    warn.mockRestore();
  });
});
