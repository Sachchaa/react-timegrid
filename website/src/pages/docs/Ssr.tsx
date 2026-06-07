import { DocPage, DocH2, Prose } from "../../components/Doc";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout } from "../../components/Callout";

export function Ssr() {
  return (
    <DocPage
      category="Guides"
      title="Server-side Rendering"
      lead="The calendar is safe to render on the server — no window access during the initial render, and no hydration mismatches."
    >
      <Prose>
        <p>The component is designed to work in SSR and SSG environments out of the box:</p>
        <ul>
          <li>
            All <code>window</code> / <code>document</code> access is guarded.
          </li>
          <li>
            <code>useLayoutEffect</code> is swapped for <code>useEffect</code> when there is no DOM,
            avoiding the usual SSR warning.
          </li>
          <li>The initial render does not depend on viewport measurement.</li>
          <li>Popover positioning runs on the client only, after mount.</li>
        </ul>
      </Prose>

      <DocH2 id="next">Next.js (App Router)</DocH2>
      <Prose>
        <p>
          Because the calendar uses state and effects, render it from a Client Component. The server
          still pre-renders the markup; interactivity hydrates on the client.
        </p>
      </Prose>
      <CodeBlock
        filename="app/calendar/calendar-view.tsx"
        language="tsx"
        code={`"use client";

import { Calendar } from "@codesutra/react-timegrid";
import "@codesutra/react-timegrid/styles.css";

export function CalendarView() {
  return <Calendar defaultView="month" />;
}`}
      />
      <Prose>
        <p>Then use it from a server component (or page) as usual:</p>
      </Prose>
      <CodeBlock
        filename="app/calendar/page.tsx"
        language="tsx"
        code={`import { CalendarView } from "./calendar-view";

export default function Page() {
  return <CalendarView />;
}`}
      />

      <Callout variant="note" title="Importing styles">
        Import <code>@codesutra/react-timegrid/styles.css</code> once — in the client component, a
        shared layout, or your global stylesheet.
      </Callout>
    </DocPage>
  );
}
