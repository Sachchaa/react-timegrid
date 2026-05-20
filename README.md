# react-timegrid

> **⚠️ Beta:** This package is in beta. The API may change before a stable `1.0.0` release, and some edges may still be rough. Please report issues you run into.

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

This is a beta release, so install it from the `beta` dist-tag (or pin the exact `0.0.1-beta` version):

```bash
pnpm add @codesutra/react-timegrid@beta
```

## Quick Start

```tsx
import { Calendar } from "@codesutra/react-timegrid";
import "@codesutra/react-timegrid/styles.css";
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
| `errorFallback` | `ReactNode` | inline alert | Fallback rendered when an internal error is caught |
| `onError` | `(error, info) => void` | — | Called when the internal error boundary catches an error |
| `className` | `string` | — | Additional CSS class |

`Calendar` forwards its ref to the root `<div>`, so you can use `useRef<HTMLDivElement>()` to measure or focus it.

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

## Styling

The library ships a precompiled stylesheet at `react-timegrid/styles.css`. It is self-contained — you do **not** need to install or configure Tailwind in your application to use it:

```ts
import "react-timegrid/styles.css";
```

The theme is driven by CSS custom properties (`--background`, `--foreground`, `--primary`, `--border`, `--accent`, `--muted`, `--popover`, `--ring`, `--destructive`, and the corresponding `*-foreground` variants). Override them on `:root` or a parent element to retheme — including dark mode via `prefers-color-scheme` or a `.dark` class on a parent.

If you already use Tailwind v4, you can instead import `react-timegrid/src/styles.css` as a source file and let your own pipeline tree-shake the classes.

## Accessibility

- The month view is a WAI-ARIA grid: arrow keys move between cells, `Home` / `End` jump to the start / end of a week, and `Enter` / `Space` activate a date cell.
- Week and day views expose the time grid as a labelled `region`. Each time slot is a real `<button>` with an `aria-label` describing its start and end time, so it is reachable with `Tab` and activates with `Enter` / `Space`.
- Events render as buttons with composed `aria-label`s (title + time range, with an `"Untitled event"` fallback if no title is provided).
- The event details popover is a `dialog` that closes on `Escape` or click outside.

## Server-side rendering

The component is safe to render on the server. `window` / `document` access is guarded, `useLayoutEffect` is swapped for `useEffect` when there is no DOM, and the initial render does not depend on viewport measurement. The popover positioning runs on the client only.

## Error handling

The calendar's internal subtree is wrapped in an error boundary. If a render error escapes (for example from a malformed event), it renders an inline `role="alert"` fallback instead of crashing the host application. Customise the fallback with the `errorFallback` prop, or hook into `onError` to report it.

If you want to apply the same boundary to your own code, the class is exported:

```tsx
import { CalendarErrorBoundary } from "react-timegrid";

<CalendarErrorBoundary onError={(err) => report(err)}>
  <YourComponent />
</CalendarErrorBoundary>;
```

## Hooks

The package also exports the underlying hooks for custom implementations:

- `useCalendarNav(options)` — Date navigation and view switching. Supports controlled (`value`, `view`) and uncontrolled (`defaultValue`, `defaultView`) modes. Returns `{ currentDate, view, goToNext, goToPrev, goToToday, goToDate, setView }`.
- `useMonthGrid({ date, events, weekStartsOn })` — Returns `{ weeks }`, the 6-row grid of `MonthGridDay`s for the month containing `date`, with events filtered to each cell.
- `useTimeGrid({ dates, events })` — Returns `{ columns, timeSlots }` for week/day views: 48 half-hour slots and one column per date with positioned timed events and all-day events.
- `useEvents({ events, range })` — Returns the events whose date range intersects `range`.

## Development

```bash
pnpm install
pnpm dev             # Start Storybook
pnpm test            # Run tests
pnpm build           # Build the package
```

## License

MIT
