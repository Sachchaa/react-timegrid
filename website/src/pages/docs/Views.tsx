import { DocPage, DocH2, Prose, A } from "../../components/Doc";
import { CodeBlock } from "../../components/CodeBlock";
import { CalendarDemo } from "../../components/Demo";
import { Callout } from "../../components/Callout";

export function Views() {
  return (
    <DocPage
      category="Guides"
      title="Views"
      lead="Month, week, and day — each demo below has a built-in switcher in its header, so you can jump between views and navigate dates live."
    >
      <Prose>
        <p>
          The calendar renders one of three views at a time. Set the initial view with{" "}
          <code>defaultView</code> (uncontrolled) or drive it yourself with <code>view</code>{" "}
          (controlled). The header exposes <strong>Today</strong>, previous/next navigation, and a{" "}
          <strong>Month / Week / Day</strong> tab group.
        </p>
      </Prose>

      <CodeBlock
        language="tsx"
        code={`// Uncontrolled — calendar manages its own view
<Calendar defaultView="week" />

// Controlled — you own the state
const [view, setView] = useState<ViewMode>("month");
<Calendar view={view} onViewChange={setView} />`}
      />

      <DocH2 id="month">Month view</DocH2>
      <Prose>
        <p>
          A six-row grid of the current month. Events are stacked within each day cell; click a date
          cell to trigger <code>onDateClick</code>.
        </p>
      </Prose>
      <CalendarDemo defaultView="month" />

      <DocH2 id="week">Week view</DocH2>
      <Prose>
        <p>
          Seven day-columns over a 48-slot, half-hour time grid. Timed events are positioned by their
          start and end, with overlapping events laid out side by side. All-day events sit in a
          dedicated row above the grid.
        </p>
      </Prose>
      <CalendarDemo defaultView="week" />

      <DocH2 id="day">Day view</DocH2>
      <Prose>
        <p>A single focused day using the same time grid as the week view.</p>
      </Prose>
      <CalendarDemo defaultView="day" />

      <Callout variant="tip" title="Where does it start?">
        Combine views with <A href="/docs/i18n">weekStartsOn and locale</A> to control the first day
        of the week and how dates are formatted.
      </Callout>
    </DocPage>
  );
}
