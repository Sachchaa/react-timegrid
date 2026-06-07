import { useEffect, useRef } from "react";
import { Calendar, type CalendarProps } from "@timegrid";
import { BrowserFrame } from "./BrowserFrame";
import { makeSampleEvents } from "../data/events";

const defaultEvents = makeSampleEvents();

/**
 * Returns a ref to attach around a <Calendar>. After each render it scrolls the
 * library's internal time grid to business hours so week/day demos show their
 * events instead of opening on an empty midnight.
 */
export function useGridAutoScroll(hour = 7) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const region = ref.current?.querySelector<HTMLElement>('[aria-label="Time grid"]');
      if (region) region.scrollTop = hour * 80; // 80px per hour (two 40px slots)
    });
    return () => cancelAnimationFrame(id);
  });
  return ref;
}

/** Renders the real <Calendar> inside an app-window frame for live docs demos. */
export function CalendarDemo({
  title = "App.tsx",
  className = "",
  events = defaultEvents,
  ...props
}: CalendarProps & { title?: string }) {
  const ref = useGridAutoScroll();
  return (
    <BrowserFrame title={title} className={className}>
      <div ref={ref} className="tg-demo">
        <Calendar events={events} {...props} />
      </div>
    </BrowserFrame>
  );
}
