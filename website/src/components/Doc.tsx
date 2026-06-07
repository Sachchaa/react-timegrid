import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/site";

/** Wrapper that applies long-form prose styling to plain markup chunks. */
export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`prose max-w-none ${className}`}>{children}</div>;
}

/** Smart link: internal paths use the SPA router, everything else is a plain anchor. */
export function A({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/")) return <Link to={href}>{children}</Link>;
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
    >
      {children}
    </a>
  );
}

export function DocH2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="group mt-14 scroll-mt-24 text-2xl font-bold tracking-tight">
      <a href={`#${id}`} className="no-underline">
        {children}
        <span className="ml-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          #
        </span>
      </a>
    </h2>
  );
}

export function DocH3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="mt-9 scroll-mt-24 text-lg font-semibold tracking-tight">
      {children}
    </h3>
  );
}

/** Standard page header + sets the document title. */
export function DocPage({
  category,
  title,
  lead,
  children,
}: {
  category?: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
}) {
  useEffect(() => {
    document.title = `${title} · ${site.name}`;
    return () => {
      document.title = site.name;
    };
  }, [title]);

  return (
    <article>
      <header className="mb-2">
        {category && (
          <p className="mb-2 text-sm font-semibold tracking-wide text-[var(--brand)]">{category}</p>
        )}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {lead && <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{lead}</p>}
      </header>
      <div className="space-y-5">{children}</div>
    </article>
  );
}
