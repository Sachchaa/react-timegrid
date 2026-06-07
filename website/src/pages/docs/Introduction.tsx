import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { DocPage, DocH2, Prose } from "../../components/Doc";
import { FeatureGrid } from "../../components/Features";
import { CalendarDemo } from "../../components/Demo";

export function Introduction() {
  return (
    <DocPage
      category="Getting Started"
      title="Introduction"
      lead="react-timegrid is a full-featured, accessible React calendar component with month, week, and day views — built on @internationalized/date for timezone-aware, i18n-ready scheduling."
    >
      <Prose>
        <p>
          Drop in a single <code>&lt;Calendar&gt;</code> component and get a polished scheduling UI
          with timed and all-day events, overlap handling, keyboard navigation, and dark mode. It
          ships a precompiled stylesheet, so you don&rsquo;t need to configure Tailwind in your own
          app to use it.
        </p>
      </Prose>

      <CalendarDemo defaultView="month" />

      <DocH2 id="features">Features</DocH2>
      <FeatureGrid />

      <DocH2 id="why">Why react-timegrid?</DocH2>
      <Prose>
        <ul>
          <li>
            <strong>Correct dates by construction.</strong> Every date is a{" "}
            <code>CalendarDate</code> or <code>CalendarDateTime</code> from{" "}
            <code>@internationalized/date</code>, so there&rsquo;s no timezone drift or off-by-one
            month math.
          </li>
          <li>
            <strong>Accessible from day one.</strong> The month grid implements the WAI-ARIA grid
            pattern, time slots are real buttons, and events expose descriptive labels.
          </li>
          <li>
            <strong>Tiny footprint.</strong> One runtime dependency, no moment/dayjs, and a
            tree-shakeable ESM build.
          </li>
          <li>
            <strong>Yours to restyle.</strong> The theme is driven entirely by CSS custom
            properties, so it adapts to your design system in minutes.
          </li>
        </ul>
      </Prose>

      <DocH2 id="next">Next steps</DocH2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/docs/installation"
          className="group rounded-xl border border-border p-5 transition-colors hover:border-[var(--brand)]/50 hover:bg-accent/40"
        >
          <h3 className="flex items-center justify-between font-semibold">
            Installation
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--brand)]" />
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Add the package and import the stylesheet.
          </p>
        </Link>
        <Link
          to="/docs/quick-start"
          className="group rounded-xl border border-border p-5 transition-colors hover:border-[var(--brand)]/50 hover:bg-accent/40"
        >
          <h3 className="flex items-center justify-between font-semibold">
            Quick Start
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--brand)]" />
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Render your first calendar with events.
          </p>
        </Link>
      </div>
    </DocPage>
  );
}
