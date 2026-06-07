import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Calendar } from "@timegrid";
import { BrowserFrame } from "../components/BrowserFrame";
import { CalendarDemo } from "../components/Demo";
import { FeatureGrid } from "../components/Features";
import { InstallTabs } from "../components/InstallTabs";
import { CodeBlock } from "../components/CodeBlock";
import { GitHubIcon } from "../components/BrandIcons";
import { makeSampleEvents } from "../data/events";
import { site } from "../data/site";

const heroEvents = makeSampleEvents();

const stats = [
  { value: "3", label: "Views — month, week, day" },
  { value: "50+", label: "Locales out of the box" },
  { value: "~8KB", label: "Single runtime dependency" },
  { value: "A11y", label: "WAI-ARIA grid + keyboard" },
];

const exampleCode = `import { Calendar } from "@codesutra/react-timegrid";
import "@codesutra/react-timegrid/styles.css";
import { CalendarDateTime } from "@internationalized/date";

export default function App() {
  return (
    <Calendar
      defaultView="week"
      events={[
        {
          id: "1",
          title: "Design review",
          start: new CalendarDateTime(2026, 4, 16, 11, 0),
          end: new CalendarDateTime(2026, 4, 16, 12, 0),
          color: "purple",
        },
      ]}
    />
  );
}`;

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.55] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[-12rem] -z-10 h-[36rem] w-[64rem] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--brand) 26%, transparent), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
        <Link
          to="/docs"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent"
        >
          <Sparkles className="h-4 w-4 text-[var(--brand)]" />
          <span>React 18 &amp; 19 · MIT licensed</span>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>

        <h1 className="mx-auto mt-7 max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">
          Beautiful, accessible <span className="text-gradient">calendars</span> for React
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
          {site.name} gives you month, week, and day views in one tiny component — timezone-aware,
          internationalized, and themeable down to the last pixel.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/docs"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-semibold shadow-sm transition-colors hover:bg-accent"
          >
            <GitHubIcon className="h-4 w-4" /> Star on GitHub
          </a>
        </div>

        <div className="mx-auto mt-8 max-w-md">
          <InstallTabs />
        </div>
      </div>

      {/* Hero product visual */}
      <div className="relative mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-x-10 top-10 -z-10 h-72 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "linear-gradient(120deg, color-mix(in oklab, var(--brand) 35%, transparent), color-mix(in oklab, var(--brand-2) 35%, transparent))",
          }}
          aria-hidden="true"
        />
        <BrowserFrame title="App.tsx" className="shadow-2xl ring-1 ring-black/5">
          <Calendar defaultView="month" events={heroEvents} />
        </BrowserFrame>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-4xl font-extrabold tracking-tight text-gradient">{s.value}</div>
            <div className="mt-1.5 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold tracking-wide text-[var(--brand)]">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-lg text-muted-foreground">{description}</p>
    </div>
  );
}

function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Everything included"
        title="Batteries-included scheduling"
        description="The hard parts — overlap layout, keyboard nav, localization — are handled so you can focus on your product."
      />
      <div className="mt-12">
        <FeatureGrid />
      </div>
    </section>
  );
}

function InAction() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Live, not a screenshot"
          title="See it in action"
          description="This is the real component. Switch views, navigate dates, and click an event to open its details."
        />
        <div className="mt-12">
          <CalendarDemo defaultView="week" title="schedule.tsx" className="shadow-xl" />
        </div>
      </div>
    </section>
  );
}

function CodeExample() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Tiny API"
        title="One component, sensible defaults"
        description="Pass your events and pick a view. Everything else is optional."
      />
      <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
        <CodeBlock filename="App.tsx" code={exampleCode} />
        <CalendarDemo title="Preview" className="shadow-lg" defaultView="week" events={heroEvents} />
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-16 text-center"
        style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-20"
          aria-hidden="true"
        />
        <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to build your calendar?
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-lg text-white/85">
          Install the package and ship a polished scheduling UI today.
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/docs/quick-start"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-neutral-900 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Read the Quick Start <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/playground"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Open the playground
          </Link>
        </div>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80">
          {["No Tailwind setup required", "TypeScript-first", "SSR safe"].map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4" /> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <InAction />
      <CodeExample />
      <CtaBand />
    </>
  );
}
