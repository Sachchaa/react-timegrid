import { CalendarDate, CalendarDateTime } from "@internationalized/date";
import type { CalendarEvent } from "../../../src/types";

/** Wednesday — the focal day for the day view and the week that frames it. */
export const FOCUS_DATE = new CalendarDate(2026, 5, 20);

const C = {
  blue: "#3b82f6",
  red: "#ef4444",
  green: "#22c55e",
  purple: "#a855f7",
  orange: "#f97316",
  yellow: "#eab308",
  pink: "#ec4899",
  indigo: "#6366f1",
} as const;

const timed = (
  id: string,
  title: string,
  day: number,
  sh: number,
  sm: number,
  eh: number,
  em: number,
  color: string
): CalendarEvent => ({
  id,
  title,
  start: new CalendarDateTime(2026, 5, day, sh, sm),
  end: new CalendarDateTime(2026, 5, day, eh, em),
  color,
});

/**
 * Events for the week of Sun May 17 – Sat May 23, 2026, clustered between
 * roughly 9:00 and 15:00 so they sit inside the cropped time-grid band.
 */
export const events: CalendarEvent[] = [
  // Mon 18
  timed("1", "Team standup", 18, 9, 0, 9, 30, C.blue),
  timed("2", "Design review", 18, 11, 0, 12, 0, C.purple),
  // Tue 19
  timed("3", "1:1 with Alex", 19, 10, 0, 10, 30, C.green),
  timed("4", "Lunch & learn", 19, 12, 30, 13, 30, C.orange),
  // Wed 20 (focus day)
  timed("5", "Sprint planning", 20, 9, 30, 11, 0, C.indigo),
  timed("6", "Client call", 20, 13, 0, 14, 0, C.red),
  timed("7", "Pair session", 20, 14, 0, 15, 0, C.blue),
  // Thu 21
  timed("8", "Deep work", 21, 9, 0, 12, 0, C.blue),
  timed("9", "Roadmap sync", 21, 13, 30, 14, 30, C.pink),
  // Fri 22
  timed("10", "Demo day", 22, 11, 0, 12, 30, C.green),
  timed("11", "Retro", 22, 14, 0, 15, 0, C.yellow),
  // All-day, spanning multiple days
  {
    id: "12",
    title: "Conference",
    start: new CalendarDate(2026, 5, 20),
    end: new CalendarDate(2026, 5, 22),
    allDay: true,
    color: C.red,
  },
  // All-day, single day — gives the month view another marker
  {
    id: "13",
    title: "Release v1.0",
    start: new CalendarDate(2026, 5, 28),
    end: new CalendarDate(2026, 5, 28),
    allDay: true,
    color: C.purple,
  },
];
