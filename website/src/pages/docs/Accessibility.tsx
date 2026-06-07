import { DocPage, DocH2, Prose } from "../../components/Doc";
import { CalendarDemo } from "../../components/Demo";
import { Callout } from "../../components/Callout";

const shortcuts: { keys: string[]; action: string }[] = [
  { keys: ["←", "→", "↑", "↓"], action: "Move between date cells in the month grid" },
  { keys: ["Home"], action: "Jump to the first day of the week" },
  { keys: ["End"], action: "Jump to the last day of the week" },
  { keys: ["Enter", "Space"], action: "Activate the focused date cell, time slot, or event" },
  { keys: ["Tab"], action: "Move to the next time slot or event button" },
  { keys: ["Esc"], action: "Close the event details popover" },
];

export function Accessibility() {
  return (
    <DocPage
      category="Guides"
      title="Accessibility"
      lead="The calendar is built on the WAI-ARIA grid pattern with full keyboard support and screen-reader-friendly labels."
    >
      <Prose>
        <p>
          Accessibility isn&rsquo;t bolted on — the structure is semantic by default. Focus the demo
          below and try navigating entirely with the keyboard.
        </p>
      </Prose>

      <CalendarDemo defaultView="month" title="accessible-calendar.tsx" />

      <DocH2 id="keyboard">Keyboard navigation</DocH2>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="px-4 py-2.5 font-semibold">Keys</th>
              <th className="px-4 py-2.5 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {shortcuts.map((s) => (
              <tr key={s.action} className="border-t border-border">
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="flex flex-wrap gap-1">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-xs font-medium shadow-sm"
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{s.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DocH2 id="semantics">Semantics &amp; ARIA</DocH2>
      <Prose>
        <ul>
          <li>
            The <strong>month view</strong> is a WAI-ARIA <code>grid</code>: roving focus moves
            between cells and a live region announces the current month.
          </li>
          <li>
            <strong>Week and day views</strong> expose the time grid as a labelled{" "}
            <code>region</code>. Each time slot is a real <code>&lt;button&gt;</code> with an{" "}
            <code>aria-label</code> describing its start and end time.
          </li>
          <li>
            <strong>Events</strong> render as buttons with composed <code>aria-label</code>s (title +
            time range), falling back to <em>&ldquo;Untitled event&rdquo;</em> when no title is set.
          </li>
          <li>
            The <strong>event details popover</strong> is a <code>dialog</code> that closes on{" "}
            <code>Escape</code> or an outside click and restores focus.
          </li>
        </ul>
      </Prose>

      <Callout variant="tip" title="Tested with axe">
        The component suite includes automated accessibility assertions via{" "}
        <code>axe-core</code>, so regressions are caught in CI.
      </Callout>
    </DocPage>
  );
}
