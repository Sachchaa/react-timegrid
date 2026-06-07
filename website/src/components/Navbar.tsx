import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { GitHubIcon, NpmIcon } from "./BrandIcons";
import { ThemeToggle } from "./ThemeToggle";
import { site } from "../data/site";

const navLinks = [
  { label: "Docs", to: "/docs" },
  { label: "Playground", to: "/playground" },
];

function linkClass({ isActive }: { isActive: boolean }) {
  return [
    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-accent text-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-foreground",
  ].join(" ");
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <Logo className="h-8 w-8 transition-transform group-hover:scale-105" />
          <span className="text-[0.95rem] font-bold tracking-tight">{site.name}</span>
          <span className="hidden rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[0.65rem] font-medium text-muted-foreground sm:inline">
            v{site.version}
          </span>
        </Link>

        <div className="ml-2 hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={linkClass}
              // /docs/* should keep "Docs" highlighted
              end={l.to === "/playground"}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub repository"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
          >
            <GitHubIcon className="h-[1.05rem] w-[1.05rem]" />
          </a>
          <a
            href={site.npm}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="npm package"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
          >
            <NpmIcon className="h-[1.05rem] w-[1.05rem]" />
          </a>
          <ThemeToggle />

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/70 bg-background/95 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-3 py-2 text-sm font-medium",
                    isActive ? "bg-accent text-foreground" : "text-muted-foreground",
                  ].join(" ")
                }
                end={l.to === "/playground"}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-border/70 pt-3">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground"
              >
                <GitHubIcon className="h-4 w-4" /> GitHub
              </a>
              <a
                href={site.npm}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground"
              >
                <NpmIcon className="h-4 w-4" /> npm
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
