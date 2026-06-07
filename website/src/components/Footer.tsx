import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { GitHubIcon, NpmIcon } from "./BrandIcons";
import { site } from "../data/site";

const columns: { title: string; links: { label: string; to: string; external?: boolean }[] }[] = [
  {
    title: "Documentation",
    links: [
      { label: "Introduction", to: "/docs" },
      { label: "Installation", to: "/docs/installation" },
      { label: "Quick Start", to: "/docs/quick-start" },
      { label: "Playground", to: "/playground" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Views", to: "/docs/views" },
      { label: "Events", to: "/docs/events" },
      { label: "Theming", to: "/docs/theming" },
      { label: "Accessibility", to: "/docs/accessibility" },
    ],
  },
  {
    title: "Reference",
    links: [
      { label: "<Calendar> props", to: "/docs/api/calendar" },
      { label: "Types", to: "/docs/api/types" },
      { label: "Hooks", to: "/docs/api/hooks" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="text-base font-bold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <GitHubIcon className="h-[1.05rem] w-[1.05rem]" />
              </a>
              <a
                href={site.npm}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="npm"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <NpmIcon className="h-[1.05rem] w-[1.05rem]" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Released under the MIT License · © {new Date().getFullYear()} {site.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
