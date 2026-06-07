import { DocPage, DocH2, Prose, A } from "../../components/Doc";
import { CodeBlock } from "../../components/CodeBlock";

export function ApiTypes() {
  return (
    <DocPage
      category="API Reference"
      title="Types"
      lead="The public TypeScript types exported from the package."
    >
      <Prose>
        <p>All types are exported from the package root and re-export cleanly:</p>
      </Prose>
      <CodeBlock
        language="ts"
        code={`import type {
  CalendarEvent,
  TimedEvent,
  AllDayEvent,
  ViewMode,
  WeekStartDay,
} from "@codesutra/react-timegrid";`}
      />

      <DocH2 id="calendar-event">CalendarEvent</DocH2>
      <Prose>
        <p>
          A discriminated union of <code>TimedEvent</code> and <code>AllDayEvent</code>, narrowed by
          the <code>allDay</code> flag.
        </p>
      </Prose>
      <CodeBlock
        language="ts"
        code={`type CalendarEvent = TimedEvent | AllDayEvent;`}
      />

      <DocH2 id="timed-event">TimedEvent</DocH2>
      <CodeBlock
        language="ts"
        code={`interface TimedEvent {
  /** Unique identifier. Must be unique across all events. */
  id: string;
  title: string;
  start: CalendarDateTime;
  /** End time, inclusive. A 10:00–11:00 event appears on the day it starts. */
  end: CalendarDateTime;
  color?: string;
  allDay?: false;
}`}
      />

      <DocH2 id="all-day-event">AllDayEvent</DocH2>
      <CodeBlock
        language="ts"
        code={`interface AllDayEvent {
  /** Unique identifier. Must be unique across all events. */
  id: string;
  title: string;
  start: CalendarDate;
  /**
   * End date, inclusive. A single-day event uses start === end;
   * a 3-day conference April 20–22 uses start: 2026-04-20, end: 2026-04-22.
   */
  end: CalendarDate;
  color?: string;
  allDay: true;
}`}
      />

      <DocH2 id="enums">ViewMode &amp; WeekStartDay</DocH2>
      <CodeBlock
        language="ts"
        code={`type ViewMode = "month" | "week" | "day";

type WeekStartDay = "sunday" | "monday";`}
      />

      <Prose>
        <p>
          <code>CalendarDate</code> and <code>CalendarDateTime</code> come from{" "}
          <A href="https://react-spectrum.adobe.com/internationalized/date/">
            @internationalized/date
          </A>
          . See the <A href="/docs/events">Events guide</A> for practical examples.
        </p>
      </Prose>
    </DocPage>
  );
}
