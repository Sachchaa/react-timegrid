import { CalendarDate, CalendarDateTime, today, getLocalTimeZone } from "@internationalized/date";
import type { CalendarEvent } from "@timegrid";

const dt = (d: CalendarDate, h: number, m = 0) =>
  new CalendarDateTime(d.year, d.month, d.day, h, m);

/**
 * Build a lively set of sample events anchored around a given day so demos
 * always show something on the current month/week regardless of the date.
 */
export function makeSampleEvents(anchor: CalendarDate = today(getLocalTimeZone())): CalendarEvent[] {
  const prev = anchor.subtract({ days: 1 });
  const next = anchor.add({ days: 1 });
  const inTwo = anchor.add({ days: 2 });
  const confStart = anchor.add({ days: 4 });
  const confEnd = anchor.add({ days: 6 });

  return [
    {
      id: "1",
      title: "Team standup",
      start: dt(anchor, 9, 0),
      end: dt(anchor, 9, 30),
      color: "blue",
    },
    {
      id: "2",
      title: "Design review",
      start: dt(anchor, 11, 0),
      end: dt(anchor, 12, 0),
      color: "purple",
    },
    {
      id: "3",
      title: "Lunch with team",
      start: dt(anchor, 12, 30),
      end: dt(anchor, 13, 30),
      color: "green",
    },
    {
      id: "4",
      title: "Code review",
      start: dt(anchor, 14, 0),
      end: dt(anchor, 15, 0),
      color: "yellow",
    },
    {
      id: "5",
      title: "Sync A",
      start: dt(anchor, 15, 0),
      end: dt(anchor, 16, 30),
      color: "blue",
    },
    {
      id: "6",
      title: "Sync B",
      start: dt(anchor, 15, 30),
      end: dt(anchor, 17, 0),
      color: "red",
    },
    {
      id: "7",
      title: "1:1 with manager",
      start: dt(prev, 14, 0),
      end: dt(prev, 14, 30),
      color: "indigo",
    },
    {
      id: "8",
      title: "Sprint planning",
      start: dt(next, 10, 0),
      end: dt(next, 11, 30),
      color: "orange",
    },
    {
      id: "9",
      title: "Product demo",
      start: dt(inTwo, 15, 0),
      end: dt(inTwo, 16, 0),
      color: "pink",
    },
    {
      id: "10",
      title: "Conference",
      start: new CalendarDate(confStart.year, confStart.month, confStart.day),
      end: new CalendarDate(confEnd.year, confEnd.month, confEnd.day),
      allDay: true,
      color: "red",
    },
  ];
}

export const EVENT_COLORS = [
  "blue",
  "red",
  "green",
  "purple",
  "orange",
  "yellow",
  "pink",
  "indigo",
] as const;
