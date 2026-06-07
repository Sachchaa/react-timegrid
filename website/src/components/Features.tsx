import {
  Accessibility,
  CalendarClock,
  CalendarRange,
  Clock,
  Feather,
  Globe,
  Palette,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: CalendarRange,
    title: "Three views",
    description: "Month, week, and day views with seamless switching out of the box.",
  },
  {
    icon: CalendarClock,
    title: "Timed & all-day events",
    description: "Smart overlap handling for timed events and multi-day all-day spans.",
  },
  {
    icon: Globe,
    title: "Internationalized",
    description: "50+ locales via @internationalized/date, including non-Gregorian calendars.",
  },
  {
    icon: Clock,
    title: "Timezone-aware",
    description: "Built on CalendarDate / CalendarDateTime — no ambiguous Date math.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description: "WAI-ARIA grid pattern, full keyboard navigation, and screen-reader labels.",
  },
  {
    icon: Feather,
    title: "Lightweight",
    description: "One tiny runtime dependency (~8 KB gzipped). No heavy date library.",
  },
  {
    icon: SlidersHorizontal,
    title: "Controlled or not",
    description: "View, date, and selection all work in controlled and uncontrolled modes.",
  },
  {
    icon: Palette,
    title: "Themeable",
    description: "Restyle everything with CSS custom properties — dark mode included.",
  },
];

export function FeatureGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {features.map((f) => (
        <div
          key={f.title}
          className="group relative bg-card p-6 transition-colors hover:bg-accent/40"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-muted)] text-[var(--brand)]">
            <f.icon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-semibold">{f.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
        </div>
      ))}
    </div>
  );
}
