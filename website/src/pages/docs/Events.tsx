import { CalendarDate, CalendarDateTime, today, getLocalTimeZone } from "@internationalized/date";
import type { CalendarEvent } from "@timegrid";
import { DocPage, DocH2, DocH3, Prose, A } from "../../components/Doc";
import { CodeBlock } from "../../components/CodeBlock";
import { CalendarDemo } from "../../components/Demo";
import { Callout } from "../../components/Callout";
import { EVENT_COLORS } from "../../data/events";

const t = today(getLocalTimeZone());
const at = (h: number, m = 0) => new CalendarDateTime(t.year, t.month, t.day, h, m);

const colorEvents: CalendarEvent[] = [
  { id: "c1", title: "Named: blue", start: at(8), end: at(9), color: "blue" },
  { id: "c2", title: "Named: tomato", start: at(9, 30), end: at(10, 30), color: "tomato" },
  { id: "c3", title: "Hex #3b82f6", start: at(11), end: at(12), color: "#3b82f6" },
  { id: "c4", title: "rgb()", start: at(12, 30), end: at(13, 30), color: "rgb(16, 185, 129)" },
  { id: "c5", title: "hsl()", start: at(14), end: at(15), color: "hsl(280, 70%, 55%)" },
  { id: "c6", title: "Default (no color)", start: at(15, 30), end: at(16, 30) },
];

const overlapEvents: CalendarEvent[] = [
  { id: "o1", title: "Meeting A", start: at(10), end: at(11, 30), color: "blue" },
  { id: "o2", title: "Meeting B", start: at(10, 30), end: at(12), color: "red" },
  { id: "o3", title: "Meeting C", start: at(11), end: at(12, 30), color: "green" },
  {
    id: "o4",
    title: "Conference",
    start: new CalendarDate(t.year, t.month, t.day),
    end: new CalendarDate(t.year, t.month, t.day),
    allDay: true,
    color: "purple",
  },
];

export function Events() {
  return (
    <DocPage
      category="Guides"
      title="Events"
      lead="Two event shapes — timed and all-day — drive everything the calendar renders."
    >
      <DocH2 id="timed">Timed events</DocH2>
      <Prose>
        <p>
          Timed events use <code>CalendarDateTime</code> for <code>start</code> and <code>end</code>.
          The end time is inclusive of the day it falls on — a 10:00–11:00 event appears on the day
          it starts.
        </p>
      </Prose>
      <CodeBlock
        language="ts"
        code={`{
  id: "1",
  title: "Design review",
  start: new CalendarDateTime(2026, 4, 16, 10, 0),
  end: new CalendarDateTime(2026, 4, 16, 11, 30),
  color: "blue",
}`}
      />

      <DocH2 id="all-day">All-day events</DocH2>
      <Prose>
        <p>
          All-day events set <code>allDay: true</code> and use <code>CalendarDate</code> values. The{" "}
          <code>end</code> date is inclusive: a single-day event uses <code>start === end</code>,
          while a three-day conference spans <code>April 20</code> through <code>April 22</code>.
        </p>
      </Prose>
      <CodeBlock
        language="ts"
        code={`{
  id: "2",
  title: "Conference",
  start: new CalendarDate(2026, 4, 20),
  end: new CalendarDate(2026, 4, 22),
  allDay: true,
  color: "purple",
}`}
      />

      <DocH2 id="colors">Colors</DocH2>
      <Prose>
        <p>
          The optional <code>color</code> accepts any valid CSS color — named keywords, hex,{" "}
          <code>rgb()</code>, <code>hsl()</code>, or <code>oklch()</code>. The color tints the
          event&rsquo;s left border and a translucent background so the title stays legible.
        </p>
      </Prose>
      <DocH3 id="preset-colors">Preset palette</DocH3>
      <Prose>
        <p>These eight keywords are commonly used and look great out of the box:</p>
      </Prose>
      <div className="flex flex-wrap gap-2">
        {EVENT_COLORS.map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm"
          >
            <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: c }} />
            <code className="font-mono text-xs">{c}</code>
          </span>
        ))}
      </div>
      <CalendarDemo defaultView="day" events={colorEvents} />

      <DocH2 id="overlap">Overlap handling</DocH2>
      <Prose>
        <p>
          When timed events overlap in week or day view, the calendar automatically lays them out in
          side-by-side columns so all of them stay clickable. Try the stacked meetings below.
        </p>
      </Prose>
      <CalendarDemo defaultView="day" events={overlapEvents} />

      <Callout variant="warning" title="Unique ids">
        Every event must have a unique <code>id</code>. Duplicate ids break React reconciliation and
        the calendar will warn in the console during development. See the full shape in the{" "}
        <A href="/docs/api/types">Types reference</A>.
      </Callout>
    </DocPage>
  );
}
