import type { CSSProperties } from "react";
import type { CalendarEvent } from "../types";

/**
 * Builds inline styles that tint an event with its custom `color`. The color is
 * used for the left accent border and a translucent background so the title
 * stays legible against any hue. Returns `undefined` when no color is set, so
 * callers fall back to their default Tailwind classes.
 */
export function getEventColorStyle(event: CalendarEvent): CSSProperties | undefined {
  if (!event.color) return undefined;
  return {
    borderLeftColor: event.color,
    backgroundColor: `color-mix(in srgb, ${event.color} 15%, transparent)`,
  };
}
