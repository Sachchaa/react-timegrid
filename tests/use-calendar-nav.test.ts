import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CalendarDate } from "@internationalized/date";
import { useCalendarNav } from "../src/hooks/use-calendar-nav";

describe("useCalendarNav", () => {
  const defaultDate = new CalendarDate(2026, 4, 16);

  it("initializes with default values", () => {
    const { result } = renderHook(() => useCalendarNav({ defaultValue: defaultDate }));
    expect(result.current.currentDate.toString()).toBe("2026-04-16");
    expect(result.current.view).toBe("month");
  });

  it("navigates to next month in month view", () => {
    const { result } = renderHook(() => useCalendarNav({ defaultValue: defaultDate }));
    act(() => result.current.goToNext());
    expect(result.current.currentDate.month).toBe(5);
  });

  it("navigates to previous month in month view", () => {
    const { result } = renderHook(() => useCalendarNav({ defaultValue: defaultDate }));
    act(() => result.current.goToPrev());
    expect(result.current.currentDate.month).toBe(3);
  });

  it("navigates by week in week view", () => {
    const { result } = renderHook(() =>
      useCalendarNav({ defaultValue: defaultDate, defaultView: "week" })
    );
    act(() => result.current.goToNext());
    expect(result.current.currentDate.day).toBe(23);
  });

  it("navigates by day in day view", () => {
    const { result } = renderHook(() =>
      useCalendarNav({ defaultValue: defaultDate, defaultView: "day" })
    );
    act(() => result.current.goToNext());
    expect(result.current.currentDate.day).toBe(17);
  });

  it("goes to today", () => {
    const farDate = new CalendarDate(2030, 1, 1);
    const { result } = renderHook(() => useCalendarNav({ defaultValue: farDate }));
    act(() => result.current.goToToday());
    const todayStr = result.current.currentDate.toString();
    expect(todayStr).not.toBe("2030-01-01");
  });

  it("switches view", () => {
    const { result } = renderHook(() => useCalendarNav({ defaultValue: defaultDate }));
    act(() => result.current.setView("week"));
    expect(result.current.view).toBe("week");
  });

  it("calls onNavigate callback", () => {
    const onNavigate = vi.fn();
    const { result } = renderHook(() => useCalendarNav({ defaultValue: defaultDate, onNavigate }));
    act(() => result.current.goToNext());
    expect(onNavigate).toHaveBeenCalledOnce();
  });

  it("calls onViewChange callback", () => {
    const onViewChange = vi.fn();
    const { result } = renderHook(() =>
      useCalendarNav({ defaultValue: defaultDate, onViewChange })
    );
    act(() => result.current.setView("day"));
    expect(onViewChange).toHaveBeenCalledWith("day");
  });

  it("respects controlled value", () => {
    const controlledDate = new CalendarDate(2026, 6, 1);
    const { result } = renderHook(() => useCalendarNav({ value: controlledDate }));
    expect(result.current.currentDate.toString()).toBe("2026-06-01");
  });
});
