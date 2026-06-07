import type { ReactNode } from "react";

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: ReactNode;
}

/** Responsive props table: a real table on desktop, stacked cards on mobile. */
export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border">
      {/* Desktop */}
      <table className="hidden w-full border-collapse text-sm md:table">
        <thead>
          <tr className="bg-muted/50 text-left">
            <th className="px-4 py-2.5 font-semibold">Prop</th>
            <th className="px-4 py-2.5 font-semibold">Type</th>
            <th className="px-4 py-2.5 font-semibold">Default</th>
            <th className="px-4 py-2.5 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-border align-top">
              <td className="whitespace-nowrap px-4 py-3">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.8rem] font-medium text-foreground">
                  {row.name}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-[0.8rem] text-[var(--brand)]">{row.type}</code>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                {row.default ? (
                  <code className="font-mono text-[0.8rem] text-muted-foreground">
                    {row.default}
                  </code>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile */}
      <div className="divide-y divide-border md:hidden">
        {rows.map((row) => (
          <div key={row.name} className="space-y-2 p-4">
            <code className="inline-block rounded bg-muted px-1.5 py-0.5 font-mono text-[0.8rem] font-medium">
              {row.name}
            </code>
            <dl className="space-y-1.5 text-sm">
              <div className="flex gap-2">
                <dt className="w-16 shrink-0 text-muted-foreground">Type</dt>
                <dd>
                  <code className="font-mono text-[0.8rem] text-[var(--brand)]">{row.type}</code>
                </dd>
              </div>
              {row.default && (
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-muted-foreground">Default</dt>
                  <dd>
                    <code className="font-mono text-[0.8rem] text-muted-foreground">
                      {row.default}
                    </code>
                  </dd>
                </div>
              )}
              <div className="flex gap-2">
                <dt className="w-16 shrink-0 text-muted-foreground">Info</dt>
                <dd className="text-muted-foreground">{row.description}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
