import { useEffect, useMemo, useState } from "react";
import { type ViewMode, type WeekStartDay } from "@timegrid";
import { CalendarDemo } from "../components/Demo";
import { CodeBlock } from "../components/CodeBlock";
import { makeSampleEvents } from "../data/events";
import { site } from "../data/site";
import type { CSSVars } from "../lib/style";

const sampleEvents = makeSampleEvents();

const locales = ["en-US", "en-GB", "fr-FR", "de-DE", "es-ES", "ja-JP", "zh-CN"];
const accents = [
  { name: "Violet", value: "oklch(0.541 0.244 293)" },
  { name: "Blue", value: "oklch(0.55 0.2 264)" },
  { name: "Emerald", value: "oklch(0.6 0.15 162)" },
  { name: "Rose", value: "oklch(0.62 0.22 12)" },
  { name: "Amber", value: "oklch(0.72 0.17 70)" },
  { name: "Slate", value: "oklch(0.3 0.03 256)" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-border">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex-1 px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
            value === opt
              ? "bg-[var(--brand)] text-[var(--brand-foreground)]"
              : "bg-background hover:bg-accent"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function Playground() {
  const [view, setView] = useState<ViewMode>("week");
  const [locale, setLocale] = useState("en-US");
  const [weekStartsOn, setWeekStartsOn] = useState<WeekStartDay>("sunday");
  const [accent, setAccent] = useState(accents[0].value);
  const [withEvents, setWithEvents] = useState(true);

  useEffect(() => {
    document.title = `Playground · ${site.name}`;
    return () => {
      document.title = site.name;
    };
  }, []);

  const style: CSSVars = { "--primary": accent, "--ring": accent };

  const code = useMemo(() => {
    const lines = [
      "<Calendar",
      `  view="${view}"`,
      `  locale="${locale}"`,
      `  weekStartsOn="${weekStartsOn}"`,
    ];
    if (withEvents) lines.push("  events={events}");
    lines.push("/>");
    return lines.join("\n");
  }, [view, locale, weekStartsOn, withEvents]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold text-[var(--brand)]">Playground</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Try it live</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Tweak the props on the left and watch the real component — and its code — update instantly.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        {/* Controls */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="space-y-6 rounded-2xl border border-border bg-card p-5">
            <Field label="View">
              <Segmented
                value={view}
                options={["month", "week", "day"] as const}
                onChange={setView}
              />
            </Field>

            <Field label="Week starts on">
              <Segmented
                value={weekStartsOn}
                options={["sunday", "monday"] as const}
                onChange={setWeekStartsOn}
              />
            </Field>

            <Field label="Locale">
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                {locales.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Accent">
              <div className="flex flex-wrap gap-2">
                {accents.map((a) => (
                  <button
                    key={a.name}
                    type="button"
                    title={a.name}
                    aria-label={a.name}
                    onClick={() => setAccent(a.value)}
                    className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      accent === a.value ? "border-foreground" : "border-transparent"
                    }`}
                    style={{ backgroundColor: a.value }}
                  />
                ))}
              </div>
            </Field>

            <Field label="Events">
              <label className="flex cursor-pointer items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  {withEvents ? "Sample events shown" : "No events"}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={withEvents}
                  onClick={() => setWithEvents((v) => !v)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    withEvents ? "bg-[var(--brand)]" : "bg-input"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      withEvents ? "translate-x-[1.4rem]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </label>
            </Field>
          </div>
        </aside>

        {/* Preview + code */}
        <div className="min-w-0 space-y-6">
          <div style={style}>
            <CalendarDemo
              title="Playground.tsx"
              className="shadow-lg"
              view={view}
              onViewChange={setView}
              locale={locale}
              weekStartsOn={weekStartsOn}
              events={withEvents ? sampleEvents : []}
            />
          </div>
          <CodeBlock filename="Generated JSX" code={code} />
        </div>
      </div>
    </div>
  );
}
