import { useState } from "react";
import { DocPage, DocH2, DocH3, Prose } from "../../components/Doc";
import { CodeBlock } from "../../components/CodeBlock";
import { CalendarDemo } from "../../components/Demo";
import { Callout } from "../../components/Callout";
import { makeSampleEvents } from "../../data/events";
import type { CSSVars } from "../../lib/style";

const demoEvents = makeSampleEvents();

const accents = [
  { name: "Violet", value: "oklch(0.541 0.244 293)" },
  { name: "Blue", value: "oklch(0.55 0.2 264)" },
  { name: "Emerald", value: "oklch(0.6 0.15 162)" },
  { name: "Rose", value: "oklch(0.62 0.22 12)" },
  { name: "Amber", value: "oklch(0.72 0.17 70)" },
  { name: "Slate", value: "oklch(0.3 0.03 256)" },
];

function ThemingExample() {
  const [accent, setAccent] = useState(accents[0].value);
  const [radius, setRadius] = useState(0.625);

  const style: CSSVars = {
    "--primary": accent,
    "--primary-foreground": "oklch(0.985 0 0)",
    "--ring": accent,
    "--radius": `${radius}rem`,
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-muted/40 p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Accent</span>
          <div className="flex gap-1.5">
            {accents.map((a) => (
              <button
                key={a.name}
                type="button"
                title={a.name}
                aria-label={a.name}
                onClick={() => setAccent(a.value)}
                className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                  accent === a.value ? "border-foreground" : "border-transparent"
                }`}
                style={{ backgroundColor: a.value }}
              />
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-muted-foreground">Radius</span>
          <input
            type="range"
            min={0}
            max={1.5}
            step={0.125}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="accent-[var(--brand)]"
          />
          <span className="w-12 font-mono text-xs text-muted-foreground">{radius}rem</span>
        </label>
      </div>

      <div style={style}>
        <CalendarDemo title="themed-calendar.tsx" defaultView="month" events={demoEvents} />
      </div>
    </div>
  );
}

export function Theming() {
  return (
    <DocPage
      category="Guides"
      title="Theming"
      lead="The entire calendar is driven by CSS custom properties — override them on any ancestor to restyle, including full dark mode."
    >
      <Prose>
        <p>
          The shipped stylesheet defines a neutral shadcn-style token set at low specificity, so any
          ancestor that redefines the same variables wins automatically. Try recoloring the live
          calendar below.
        </p>
      </Prose>

      <ThemingExample />

      <DocH2 id="tokens">Design tokens</DocH2>
      <Prose>
        <p>The theme reads the following custom properties (each has a matching dark value):</p>
        <ul>
          <li>
            <code>--background</code> / <code>--foreground</code> — base surface and text
          </li>
          <li>
            <code>--primary</code> / <code>--primary-foreground</code> — active view tab, selection
          </li>
          <li>
            <code>--muted</code> / <code>--muted-foreground</code> — secondary text and fills
          </li>
          <li>
            <code>--accent</code> / <code>--accent-foreground</code> — hover states
          </li>
          <li>
            <code>--popover</code> / <code>--popover-foreground</code> — the event details popover
          </li>
          <li>
            <code>--border</code>, <code>--input</code>, <code>--ring</code> — lines and focus rings
          </li>
          <li>
            <code>--destructive</code> and the <code>--radius</code> scale
          </li>
        </ul>
      </Prose>

      <DocH3 id="override">Overriding tokens</DocH3>
      <Prose>
        <p>Set the variables on <code>:root</code> or any wrapper element:</p>
      </Prose>
      <CodeBlock
        language="css"
        code={`:root {
  --primary: oklch(0.55 0.2 264); /* blue */
  --ring: oklch(0.55 0.2 264);
  --radius: 1rem;
}`}
      />

      <DocH2 id="dark-mode">Dark mode</DocH2>
      <Prose>
        <p>
          Provide dark values under a <code>.dark</code> class (or a{" "}
          <code>prefers-color-scheme</code> media query) on a parent element. The tokens cascade into
          the calendar automatically — toggle this site&rsquo;s theme to see it in action.
        </p>
      </Prose>
      <CodeBlock
        language="css"
        code={`.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --border: oklch(1 0 0 / 10%);
  /* …and the rest of the token set */
}`}
      />

      <Callout variant="note" title="Why it just works">
        Because the calendar styles use Tailwind&rsquo;s <code>inline</code> theme, utilities resolve
        the raw variables at the element. Redefining a token on a subtree retints only that subtree —
        no specificity battles.
      </Callout>
    </DocPage>
  );
}
