import { DocPage, DocH2, Prose } from "../../components/Doc";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout } from "../../components/Callout";

export function ApiHooks() {
  return (
    <DocPage
      category="API Reference"
      title="Hooks"
      lead="The logic behind the calendar is exported as composable hooks, so you can build a fully custom UI on top of the same engine."
    >
      <CodeBlock
        language="ts"
        code={`import {
  useCalendarNav,
  useMonthGrid,
  useTimeGrid,
  useEvents,
} from "@codesutra/react-timegrid";`}
      />

      <DocH2 id="use-calendar-nav">useCalendarNav</DocH2>
      <Prose>
        <p>
          Date navigation and view switching. Supports controlled (<code>value</code>,{" "}
          <code>view</code>) and uncontrolled (<code>defaultValue</code>, <code>defaultView</code>)
          modes.
        </p>
      </Prose>
      <CodeBlock
        language="ts"
        code={`function useCalendarNav(options?: {
  defaultValue?: CalendarDate;
  value?: CalendarDate;
  onNavigate?: (date: CalendarDate) => void;
  defaultView?: ViewMode;
  view?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
}): {
  currentDate: CalendarDate;
  view: ViewMode;
  goToNext: () => void;
  goToPrev: () => void;
  goToToday: () => void;
  goToDate: (date: CalendarDate) => void;
  setView: (view: ViewMode) => void;
};`}
      />

      <DocH2 id="use-month-grid">useMonthGrid</DocH2>
      <Prose>
        <p>
          Builds the six-row month grid for the month containing <code>date</code>, with events
          filtered into each day cell.
        </p>
      </Prose>
      <CodeBlock
        language="ts"
        code={`function useMonthGrid(options: {
  date: CalendarDate;
  events: CalendarEvent[];
  weekStartsOn: WeekStartDay;
}): {
  weeks: MonthGridWeek[]; // each week has 7 MonthGridDay cells
};`}
      />

      <DocH2 id="use-time-grid">useTimeGrid</DocH2>
      <Prose>
        <p>
          Produces the columns and half-hour time slots for week/day views, with timed events
          positioned and all-day events separated. Defaults to a full 24-hour grid.
        </p>
      </Prose>
      <CodeBlock
        language="ts"
        code={`function useTimeGrid(options: {
  date: CalendarDate;
  events: CalendarEvent[];
  weekStartsOn: WeekStartDay;
  locale: string;
  startHour?: number; // default 0
  endHour?: number;   // default 24
}): {
  columns: DayColumn[];   // one per day, with positioned + all-day events
  timeSlots: TimeSlot[];  // 48 half-hour slots by default
  startHour: number;
  endHour: number;
};`}
      />

      <DocH2 id="use-events">useEvents</DocH2>
      <Prose>
        <p>
          Splits the events that fall on a given <code>date</code> into all, timed, and all-day
          buckets.
        </p>
      </Prose>
      <CodeBlock
        language="ts"
        code={`function useEvents(options: {
  events: CalendarEvent[];
  date: CalendarDate;
}): {
  allEvents: CalendarEvent[];
  timedEvents: TimedEvent[];
  allDayEvents: AllDayEvent[];
};`}
      />

      <Callout variant="tip" title="Build your own calendar">
        These hooks are exactly what <code>&lt;Calendar&gt;</code> uses internally. Compose them with
        your own markup when you need a completely custom layout while keeping the date math correct.
      </Callout>
    </DocPage>
  );
}
