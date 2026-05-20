import { useState, useCallback, useMemo } from "react";
import { type CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
import type { ViewMode } from "../types";

export interface UseCalendarNavOptions {
  defaultValue?: CalendarDate;
  value?: CalendarDate;
  onNavigate?: (date: CalendarDate) => void;
  defaultView?: ViewMode;
  view?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
}

export interface UseCalendarNavReturn {
  currentDate: CalendarDate;
  view: ViewMode;
  goToNext: () => void;
  goToPrev: () => void;
  goToToday: () => void;
  goToDate: (date: CalendarDate) => void;
  setView: (view: ViewMode) => void;
}

export function useCalendarNav(options: UseCalendarNavOptions = {}): UseCalendarNavReturn {
  const {
    defaultValue,
    value: controlledValue,
    onNavigate,
    defaultView = "month",
    view: controlledView,
    onViewChange,
  } = options;

  const [internalDate, setInternalDate] = useState<CalendarDate>(
    () => defaultValue ?? today(getLocalTimeZone())
  );
  const [internalView, setInternalView] = useState<ViewMode>(defaultView);

  const currentDate = controlledValue ?? internalDate;
  const view = controlledView ?? internalView;

  const navigate = useCallback(
    (date: CalendarDate) => {
      if (!controlledValue) {
        setInternalDate(date);
      }
      onNavigate?.(date);
    },
    [controlledValue, onNavigate]
  );

  const setView = useCallback(
    (newView: ViewMode) => {
      if (!controlledView) {
        setInternalView(newView);
      }
      onViewChange?.(newView);
    },
    [controlledView, onViewChange]
  );

  const goToNext = useCallback(() => {
    switch (view) {
      case "month":
        navigate(currentDate.add({ months: 1 }));
        break;
      case "week":
        navigate(currentDate.add({ weeks: 1 }));
        break;
      case "day":
        navigate(currentDate.add({ days: 1 }));
        break;
    }
  }, [view, currentDate, navigate]);

  const goToPrev = useCallback(() => {
    switch (view) {
      case "month":
        navigate(currentDate.subtract({ months: 1 }));
        break;
      case "week":
        navigate(currentDate.subtract({ weeks: 1 }));
        break;
      case "day":
        navigate(currentDate.subtract({ days: 1 }));
        break;
    }
  }, [view, currentDate, navigate]);

  const goToToday = useCallback(() => {
    navigate(today(getLocalTimeZone()));
  }, [navigate]);

  return useMemo(
    () => ({
      currentDate,
      view,
      goToNext,
      goToPrev,
      goToToday,
      goToDate: navigate,
      setView,
    }),
    [currentDate, view, goToNext, goToPrev, goToToday, navigate, setView]
  );
}
