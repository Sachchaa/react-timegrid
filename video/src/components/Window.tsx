import type { CalendarDate } from "@internationalized/date";
import { Calendar } from "../../../src/index";
import type { ViewMode } from "../../../src/types";
import { events } from "../data/events";
import { FONT } from "../theme";

interface WindowProps {
  view: ViewMode;
  value: CalendarDate;
  width?: number;
}

/** A faux app window framing the live <Calendar> component. */
export const Window: React.FC<WindowProps> = ({ view, value, width = 1180 }) => {
  const isTimeGrid = view !== "month";

  return (
    <div
      style={{
        width,
        fontFamily: FONT,
        borderRadius: 20,
        boxShadow:
          "0 2px 4px rgba(0,0,0,0.04), 0 24px 48px -12px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.6) inset",
      }}
      className="overflow-hidden border border-border bg-card"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
        <div className="mx-auto flex items-center gap-2 rounded-md bg-background px-3 py-1 text-[13px] text-muted-foreground shadow-sm">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
          </svg>
          @codesutra/react-timegrid
        </div>
      </div>

      <div
        className={isTimeGrid ? "tg-crop" : undefined}
        style={
          isTimeGrid
            ? ({ "--tg-offset": "690px", "--tg-viewport": "540px" } as React.CSSProperties)
            : undefined
        }
      >
        <Calendar view={view} value={value} events={events} weekStartsOn="sunday" />
      </div>
    </div>
  );
};
