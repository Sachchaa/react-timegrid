import { DocPage, DocH2, Prose, A } from "../../components/Doc";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout } from "../../components/Callout";

export function ErrorHandling() {
  return (
    <DocPage
      category="Guides"
      title="Error Handling"
      lead="The calendar's internal subtree is wrapped in an error boundary so a malformed event never crashes your whole app."
    >
      <Prose>
        <p>
          If a render error escapes — say, from a malformed event — the calendar renders an inline{" "}
          <code>role=&quot;alert&quot;</code> fallback instead of taking down the host application.
          You can customize that fallback and hook into the error.
        </p>
      </Prose>

      <DocH2 id="custom-fallback">Custom fallback</DocH2>
      <Prose>
        <p>
          Pass any node to <code>errorFallback</code> to replace the default inline alert:
        </p>
      </Prose>
      <CodeBlock
        language="tsx"
        code={`<Calendar
  events={events}
  errorFallback={<div className="p-4">Couldn't load the calendar.</div>}
  onError={(error, info) => reportToSentry(error, info)}
/>`}
      />

      <DocH2 id="reuse-boundary">Reusing the boundary</DocH2>
      <Prose>
        <p>
          The same error boundary is exported as <code>CalendarErrorBoundary</code>, so you can wrap
          your own components with identical behaviour:
        </p>
      </Prose>
      <CodeBlock
        language="tsx"
        code={`import { CalendarErrorBoundary } from "@codesutra/react-timegrid";

<CalendarErrorBoundary onError={(err) => report(err)}>
  <YourComponent />
</CalendarErrorBoundary>;`}
      />

      <Callout variant="warning" title="Boundaries catch render errors only">
        Like all React error boundaries, this catches errors thrown during rendering, in lifecycle
        methods, and in constructors — not in event handlers or async code.
      </Callout>

      <Prose>
        <p>
          See the <A href="/docs/api/calendar">Calendar API</A> for the exact{" "}
          <code>errorFallback</code> and <code>onError</code> signatures.
        </p>
      </Prose>
    </DocPage>
  );
}
