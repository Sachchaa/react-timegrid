import type { ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";

type Variant = "note" | "tip" | "warning";

const config: Record<
  Variant,
  { icon: typeof Info; label: string; classes: string; iconClass: string }
> = {
  note: {
    icon: Info,
    label: "Note",
    classes: "border-blue-500/30 bg-blue-500/[0.06]",
    iconClass: "text-blue-500",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    classes: "border-emerald-500/30 bg-emerald-500/[0.06]",
    iconClass: "text-emerald-500",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    classes: "border-amber-500/30 bg-amber-500/[0.06]",
    iconClass: "text-amber-500",
  },
};

export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, label, classes, iconClass } = config[variant];
  return (
    <div className={`my-5 flex gap-3 rounded-xl border p-4 ${classes}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconClass}`} />
      <div className="min-w-0 text-sm leading-relaxed [&>:first-child]:mt-0 [&>:last-child]:mb-0 [&_code]:rounded [&_code]:bg-background/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]">
        <p className="mb-1 font-semibold text-foreground">{title ?? label}</p>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
