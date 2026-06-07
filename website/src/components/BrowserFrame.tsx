import type { ReactNode } from "react";

/** A lightweight app-window chrome used to frame live calendar demos. */
export function BrowserFrame({
  children,
  title,
  className = "",
  bodyClassName = "",
}: {
  children: ReactNode;
  title?: string;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-card shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
        </span>
        {title && (
          <span className="mx-auto truncate rounded-md bg-background/60 px-3 py-0.5 font-mono text-xs text-muted-foreground">
            {title}
          </span>
        )}
      </div>
      <div className={`bg-card ${bodyClassName}`}>{children}</div>
    </div>
  );
}
