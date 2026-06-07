import { DocPage, DocH2, Prose, A } from "../../components/Doc";
import { CodeBlock } from "../../components/CodeBlock";
import { PropsTable, type PropRow } from "../../components/PropsTable";

const rows: PropRow[] = [
  { name: "view", type: `"month" | "week" | "day"`, description: "Controlled view mode." },
  { name: "defaultView", type: "ViewMode", default: `"month"`, description: "Initial view (uncontrolled)." },
  { name: "value", type: "CalendarDate", description: "Controlled current date." },
  { name: "defaultValue", type: "CalendarDate", default: "today()", description: "Initial date (uncontrolled)." },
  { name: "events", type: "CalendarEvent[]", default: "[]", description: "Events to render." },
  { name: "locale", type: "string", default: `"en-US"`, description: "BCP 47 locale string." },
  { name: "weekStartsOn", type: `"sunday" | "monday"`, default: `"sunday"`, description: "First day of the week." },
  { name: "onEventClick", type: "(event: CalendarEvent) => void", description: "Called when an event is clicked." },
  { name: "onDateClick", type: "(date: CalendarDate) => void", description: "Called when a date cell or time slot is activated." },
  { name: "onViewChange", type: "(view: ViewMode) => void", description: "Called when the view changes." },
  { name: "onNavigate", type: "(date: CalendarDate) => void", description: "Called when navigation changes the date." },
  { name: "errorFallback", type: "ReactNode", default: "inline alert", description: "Rendered when an internal render error is caught." },
  { name: "onError", type: "(error: Error, info: ErrorInfo) => void", description: "Called when the internal error boundary catches an error." },
  { name: "className", type: "string", description: "Additional class names on the root element." },
];

export function ApiCalendar() {
  return (
    <DocPage
      category="API Reference"
      title="<Calendar>"
      lead="The single component that renders the whole calendar. Import it from the package root."
    >
      <CodeBlock
        language="tsx"
        code={`import { Calendar } from "@codesutra/react-timegrid";
import type { CalendarProps } from "@codesutra/react-timegrid";`}
      />

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={rows} />

      <DocH2 id="ref">Ref forwarding</DocH2>
      <Prose>
        <p>
          <code>Calendar</code> forwards its ref to the root <code>&lt;div&gt;</code>, so you can
          measure or focus it with a <code>useRef&lt;HTMLDivElement&gt;()</code>.
        </p>
      </Prose>
      <CodeBlock
        language="tsx"
        code={`const ref = useRef<HTMLDivElement>(null);

<Calendar ref={ref} events={events} />;`}
      />

      <Prose>
        <p>
          For the event and view types referenced above, see the{" "}
          <A href="/docs/api/types">Types reference</A>. The underlying logic is also available as{" "}
          <A href="/docs/api/hooks">hooks</A>.
        </p>
      </Prose>
    </DocPage>
  );
}
