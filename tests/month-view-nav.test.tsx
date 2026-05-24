import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalendarDate } from "@internationalized/date";
import { Calendar } from "../src/components/calendar";

// August 2026 renders 6 weeks (42 cells); September 2026 renders 5 (35).
const SIX_WEEK_MONTH = new CalendarDate(2026, 8, 1);

const tabbableCells = () =>
  screen.getAllByRole("gridcell").filter((c) => c.getAttribute("tabindex") === "0");

describe("MonthView keyboard navigation", () => {
  it("keeps a single tab stop after navigating to a month with fewer weeks", () => {
    render(<Calendar defaultValue={SIX_WEEK_MONTH} />);

    const cells = screen.getAllByRole("gridcell");
    expect(cells).toHaveLength(42);

    // Move the roving tab stop to the last cell of the longer month.
    fireEvent.focus(cells[cells.length - 1]);
    expect(tabbableCells()).toHaveLength(1);

    // Navigate to the shorter month; the stored index now exceeds its cells.
    fireEvent.click(screen.getByLabelText("Next"));
    expect(screen.getAllByRole("gridcell")).toHaveLength(35);

    // Exactly one cell must remain tabbable so keyboard users can re-enter.
    expect(tabbableCells()).toHaveLength(1);
  });

  it("moves the tab stop with arrow keys", () => {
    render(<Calendar defaultValue={SIX_WEEK_MONTH} />);
    const grid = screen.getByRole("grid");

    fireEvent.focus(screen.getAllByRole("gridcell")[0]);
    fireEvent.keyDown(grid, { key: "ArrowRight" });

    const updated = screen.getAllByRole("gridcell");
    const tabbable = updated.filter((c) => c.getAttribute("tabindex") === "0");
    expect(tabbable).toHaveLength(1);
    expect(tabbable[0]).toBe(updated[1]);
  });
});
