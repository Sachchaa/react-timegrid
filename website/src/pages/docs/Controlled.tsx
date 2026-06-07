import { useState } from "react";
import { type CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
import { type ViewMode } from "@timegrid";
import { DocPage, DocH2, Prose } from "../../components/Doc";
import { CodeBlock } from "../../components/CodeBlock";
import { CalendarDemo } from "../../components/Demo";
import { Callout } from "../../components/Callout";
import { makeSampleEvents } from "../../data/events";

const demoEvents = makeSampleEvents();
const views: ViewMode[] = ["month", "week", "day"];

function ControlledExample() {
  const [view, setView] = useState<ViewMode>("week");
  const [date, setDate] = useState<CalendarDate>(today(getLocalTimeZone()));
  const [log, setLog] = useState("Interact with the calendar…");

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-muted/40 p-3">
        <span className="text-sm font-medium text-muted-foreground">External controls:</span>
        <div className="flex overflow-hidden rounded-lg border border-border">
          {views.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                view === v
                  ? "bg-[var(--brand)] text-[var(--brand-foreground)]"
                  : "bg-background hover:bg-accent"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setDate(today(getLocalTimeZone()))}
          className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          Reset to today
        </button>
        <span className="ml-auto font-mono text-xs text-muted-foreground">{log}</span>
      </div>

      <CalendarDemo
        title="Controlled.tsx"
        view={view}
        onViewChange={setView}
        value={date}
        onNavigate={setDate}
        events={demoEvents}
        onEventClick={(e) => setLog(`event: ${e.title}`)}
        onDateClick={(d) => setLog(`date: ${d.toString()}`)}
      />
    </div>
  );
}

export function Controlled() {
  return (
    <DocPage
      category="Guides"
      title="Controlled & Uncontrolled"
      lead="Use the calendar as a drop-in component, or wire its view and date into your own state — both work the same way."
    >
      <DocH2 id="uncontrolled">Uncontrolled</DocH2>
      <Prose>
        <p>
          Pass <code>defaultView</code> and <code>defaultValue</code> and the calendar manages its
          own view and current date internally. This is the simplest setup.
        </p>
      </Prose>
      <CodeBlock
        language="tsx"
        code={`<Calendar
  defaultView="month"
  defaultValue={new CalendarDate(2026, 4, 16)}
  events={events}
/>`}
      />

      <DocH2 id="controlled">Controlled</DocH2>
      <Prose>
        <p>
          Provide <code>view</code> / <code>value</code> together with{" "}
          <code>onViewChange</code> / <code>onNavigate</code> to own the state yourself. This lets
          you sync the calendar with the URL, a global store, or external controls like the buttons
          below.
        </p>
      </Prose>
      <ControlledExample />
      <CodeBlock
        language="tsx"
        code={`const [view, setView] = useState<ViewMode>("week");
const [date, setDate] = useState<CalendarDate>(today(getLocalTimeZone()));

<Calendar
  view={view}
  onViewChange={setView}
  value={date}
  onNavigate={setDate}
  events={events}
/>`}
      />

      <DocH2 id="callbacks">Event callbacks</DocH2>
      <Prose>
        <p>All interactions surface through callbacks, whichever mode you use:</p>
        <ul>
          <li>
            <code>onEventClick(event)</code> — fired when an event is clicked (also opens the details
            popover).
          </li>
          <li>
            <code>onDateClick(date)</code> — fired when a date cell or time slot is activated.
          </li>
          <li>
            <code>onViewChange(view)</code> — fired when the view switches.
          </li>
          <li>
            <code>onNavigate(date)</code> — fired when navigation changes the current date.
          </li>
        </ul>
      </Prose>

      <Callout variant="note" title="Mix and match">
        You can control just one axis — for example a controlled <code>view</code> with an
        uncontrolled date — by providing only the props you care about.
      </Callout>
    </DocPage>
  );
}
