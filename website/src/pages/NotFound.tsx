import { useEffect } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/site";

export function NotFound() {
  useEffect(() => {
    document.title = `Not found · ${site.name}`;
    return () => {
      document.title = site.name;
    };
  }, []);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-extrabold tracking-tight text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-10 items-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-[var(--brand-foreground)] transition-transform hover:-translate-y-0.5"
        >
          Go home
        </Link>
        <Link
          to="/docs"
          className="inline-flex h-10 items-center rounded-xl border border-border bg-card px-5 text-sm font-semibold transition-colors hover:bg-accent"
        >
          Read the docs
        </Link>
      </div>
    </div>
  );
}
