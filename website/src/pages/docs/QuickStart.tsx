import { DocPage, DocH2, Prose, A } from "../../components/Doc";
import { CodeBlock } from "../../components/CodeBlock";
import { CalendarDemo } from "../../components/Demo";
import { Callout } from "../../components/Callout";

const quickStartCode = `import { Calendar } from "@codesutra/react-timegrid";
import "@codesutra/react-timegrid/styles.css";
import { CalendarDate, CalendarDateTime } from "@internationalized/date";

export default function App() {
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
}`;

export function QuickStart() {
  return (
    <DocPage
      category="Getting Started"
      title="Quick Start"
      lead="Render a calendar with a couple of events in under a dozen lines."
    >
      <Prose>
        <p>
          Pass an array of <code>events</code> and choose a starting view. Dates are always{" "}
          <code>CalendarDate</code> (all-day) or <code>CalendarDateTime</code> (timed) values from{" "}
          <code>@internationalized/date</code>.
        </p>
      </Prose>

      <CodeBlock filename="App.tsx" language="tsx" code={quickStartCode} />

      <DocH2 id="result">The result</DocH2>
      <Prose>
        <p>
          That&rsquo;s the live component below — try switching views, navigating between months, and
          clicking an event to open its details popover.
        </p>
      </Prose>
      <CalendarDemo defaultView="month" />

      <Callout variant="note" title="Event ids must be unique">
        Each event needs a stable, unique <code>id</code>. In development the calendar logs a console
        warning if it detects duplicates.
      </Callout>

      <DocH2 id="whats-next">What&rsquo;s next</DocH2>
      <Prose>
        <ul>
          <li>
            Learn how the three <A href="/docs/views">views</A> behave and switch between them.
          </li>
          <li>
            Dig into <A href="/docs/events">events</A> — timed, all-day, colors, and overlap.
          </li>
          <li>
            Make it match your brand with <A href="/docs/theming">theming</A>.
          </li>
        </ul>
      </Prose>
    </DocPage>
  );
}
