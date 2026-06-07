import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, ListTree } from "lucide-react";
import { docsNav, flatDocsNav } from "../data/nav";

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-7">
      {docsNav.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.items.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/docs"}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    [
                      "block rounded-lg px-3 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-[var(--brand-muted)] font-medium text-[var(--brand)]"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    ].join(" ")
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Pager() {
  const { pathname } = useLocation();
  const idx = flatDocsNav.findIndex((i) => i.path === pathname);
  if (idx === -1) return null;
  const prev = idx > 0 ? flatDocsNav[idx - 1] : null;
  const next = idx < flatDocsNav.length - 1 ? flatDocsNav[idx + 1] : null;

  return (
    <div className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          to={prev.path}
          className="group flex flex-col rounded-xl border border-border p-4 transition-colors hover:border-[var(--brand)]/50 hover:bg-accent/40"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronLeft className="h-3.5 w-3.5" /> Previous
          </span>
          <span className="mt-1 font-medium text-foreground group-hover:text-[var(--brand)]">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          to={next.path}
          className="group flex flex-col rounded-xl border border-border p-4 text-right transition-colors hover:border-[var(--brand)]/50 hover:bg-accent/40 sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            Next <ChevronRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1 font-medium text-foreground group-hover:text-[var(--brand)]">
            {next.title}
          </span>
        </Link>
      )}
    </div>
  );
}

export function DocsLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const current = flatDocsNav.find((i) => i.path === pathname);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto py-12 pr-2">
            <SidebarNav />
          </div>
        </aside>

        <div className="min-w-0 py-8 lg:py-12">
          {/* Mobile nav disclosure */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              className="flex w-full items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium"
            >
              <ListTree className="h-4 w-4 text-muted-foreground" />
              {current ? current.title : "Documentation"}
              <ChevronRight
                className={`ml-auto h-4 w-4 text-muted-foreground transition-transform ${
                  mobileOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            {mobileOpen && (
              <div className="mt-2 rounded-xl border border-border bg-card p-4">
                <SidebarNav onNavigate={() => setMobileOpen(false)} />
              </div>
            )}
          </div>

          <div className="mx-auto mt-6 max-w-3xl lg:mt-0">
            <Outlet />
            <Pager />
          </div>
        </div>
      </div>
    </div>
  );
}
