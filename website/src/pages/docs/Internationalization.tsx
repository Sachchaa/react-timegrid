import { useState } from "react";
import { type WeekStartDay } from "@timegrid";
import { DocPage, DocH2, Prose } from "../../components/Doc";
import { CodeBlock } from "../../components/CodeBlock";
import { CalendarDemo } from "../../components/Demo";
import { Callout } from "../../components/Callout";
import { makeSampleEvents } from "../../data/events";

const demoEvents = makeSampleEvents();

const locales = [
  { code: "en-US", label: "English (US)" },
  { code: "en-GB", label: "English (UK)" },
  { code: "fr-FR", label: "French" },
  { code: "de-DE", label: "German" },
  { code: "es-ES", label: "Spanish" },
  { code: "ja-JP", label: "Japanese" },
  { code: "zh-CN", label: "Chinese" },
  { code: "hi-IN", label: "Hindi" },
];

function I18nExample() {
  const [locale, setLocale] = useState("fr-FR");
  const [weekStartsOn, setWeekStartsOn] = useState<WeekStartDay>("monday");

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-muted-foreground">Locale</span>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {locales.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label} ({l.code})
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-muted-foreground">Week starts on</span>
          <div className="flex overflow-hidden rounded-lg border border-border">
            {(["sunday", "monday"] as WeekStartDay[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setWeekStartsOn(d)}
                className={`px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  weekStartsOn === d
                    ? "bg-[var(--brand)] text-[var(--brand-foreground)]"
                    : "bg-background hover:bg-accent"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </label>
      </div>

      <CalendarDemo
        key={`${locale}-${weekStartsOn}`}
        title="Calendar.tsx"
        defaultView="month"
        locale={locale}
        weekStartsOn={weekStartsOn}
        events={demoEvents}
      />
    </div>
  );
}

export function Internationalization() {
  return (
    <DocPage
      category="Guides"
      title="Internationalization"
      lead="Format dates for 50+ locales and choose the first day of the week — powered by @internationalized/date."
    >
      <Prose>
        <p>
          The <code>locale</code> prop is any BCP 47 locale string. It controls month and weekday
          names, date formatting in the header, and number systems. The <code>weekStartsOn</code>{" "}
          prop chooses between a Sunday- or Monday-first week.
        </p>
      </Prose>

      <I18nExample />

      <DocH2 id="usage">Usage</DocH2>
      <CodeBlock
        language="tsx"
        code={`<Calendar
  locale="fr-FR"
  weekStartsOn="monday"
  events={events}
/>`}
      />

      <DocH2 id="calendars">Non-Gregorian calendars</DocH2>
      <Prose>
        <p>
          Because dates are <code>@internationalized/date</code> values, locales that imply a
          different calendar system (for example Japanese or Buddhist calendars) format correctly
          without any extra configuration.
        </p>
      </Prose>

      <Callout variant="tip" title="Pick a sensible default">
        Many regions start the week on Monday. Pair <code>weekStartsOn=&quot;monday&quot;</code> with
        a matching <code>locale</code> for a fully localized experience.
      </Callout>
    </DocPage>
  );
}
