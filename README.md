# react-timegrid

A full-featured React calendar component with month, week, and day views. Built with `@internationalized/date` for timezone-aware, i18n-ready date handling, and styled with Tailwind CSS.

## Features

- **Three views** — Month, Week, and Day with seamless switching
- **Event support** — Timed events and all-day events with overlap handling
- **Internationalization** — 50+ locales via `@internationalized/date`, including non-Gregorian calendars
- **Timezone-aware** — All dates use `CalendarDate` / `CalendarDateTime` types
- **Accessible** — WAI-ARIA grid pattern, keyboard navigation, screen reader support
- **Lightweight** — No heavy dependencies; `@internationalized/date` is the only runtime dep (~8KB gzipped)
- **Controlled & uncontrolled** — Works both ways for view, date, and selection state
- **Customizable** — Override styles via CSS custom properties

## Installation

```bash
pnpm add react-timegrid
```

## Quick Start

```tsx
import { Calendar } from "react-timegrid";
import "react-timegrid/styles.css";
import { CalendarDate, CalendarDateTime } from "@internationalized/date";

function App() {
  return (
    <Calendar
      defaultView="month"
      defaultValue={new CalendarDate(2026, 4, 16)}
      events={[
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
      ]}
      onEventClick={(event) => console.log("Clicked:", event)}
      onDateClick={(date) => console.log("Date:", date.toString())}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `view` | `"month" \| "week" \| "day"` | — | Controlled view mode |
| `defaultView` | `"month" \| "week" \| "day"` | `"month"` | Default view mode |
| `value` | `CalendarDate` | — | Controlled current date |
| `defaultValue` | `CalendarDate` | `today()` | Default current date |
| `events` | `CalendarEvent[]` | `[]` | Array of calendar events |
| `locale` | `string` | `"en-US"` | BCP 47 locale string |
| `weekStartsOn` | `"sunday" \| "monday"` | `"sunday"` | First day of the week |
| `onEventClick` | `(event: CalendarEvent) => void` | — | Event click handler |
| `onDateClick` | `(date: CalendarDate) => void` | — | Date cell click handler |
| `onViewChange` | `(view: ViewMode) => void` | — | View change handler |
| `onNavigate` | `(date: CalendarDate) => void` | — | Navigation handler |
| `className` | `string` | — | Additional CSS class |

## Event Types

**Timed events** have specific start/end times:

```ts
{
  id: "1",
  title: "Meeting",
  start: new CalendarDateTime(2026, 4, 16, 10, 0),
  end: new CalendarDateTime(2026, 4, 16, 11, 30),
  color: "blue", // blue | red | green | purple | orange | yellow | pink | indigo
}
```

**All-day events** span full days:

```ts
{
  id: "2",
  title: "Conference",
  start: new CalendarDate(2026, 4, 20),
  end: new CalendarDate(2026, 4, 22),
  allDay: true,
  color: "purple",
}
```

## Hooks

The package also exports the underlying hooks for custom implementations:

- `useCalendarNav` — Date navigation and view switching
- `useMonthGrid` — Month grid calculation (weeks, days, events)
- `useTimeGrid` — Time grid calculation for week/day views
- `useEvents` — Event filtering by date

## Development

```bash
pnpm install
pnpm dev             # Start Storybook
pnpm test            # Run tests
pnpm build           # Build the package
```

## License

MIT
