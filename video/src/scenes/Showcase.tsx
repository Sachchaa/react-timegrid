import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Window } from "../components/Window";
import { FOCUS_DATE } from "../data/events";
import type { ViewMode } from "../../../src/types";
import { FONT, INK, SUBTLE, ACCENT } from "../theme";

const SCALE = 1.06;

const VIEW_INFO: Record<ViewMode, { kicker: string; title: string; blurb: string }> = {
  month: {
    kicker: "01 — Month",
    title: "The whole month at a glance",
    blurb: "A WAI-ARIA grid with all-day events, multi-day spans, and keyboard navigation.",
  },
  week: {
    kicker: "02 — Week",
    title: "A time grid that handles overlap",
    blurb: "Half-hour slots, an all-day row, and timed events laid out side by side.",
  },
  day: {
    kicker: "03 — Day",
    title: "Zoom in on a single day",
    blurb: "The same events, same data — switch views without losing your place.",
  },
};

/** Smooth in/out opacity for a layer that is "active" between [start, end]. */
function band(local: number, start: number, end: number, fade: number) {
  return interpolate(
    local,
    [start - fade, start, end, end + fade],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
}

const Caption: React.FC<{ view: ViewMode; opacity: number }> = ({ view, opacity }) => {
  const info = VIEW_INFO[view];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity,
      }}
    >
      <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.18em", color: ACCENT, textTransform: "uppercase" }}>
        {info.kicker}
      </span>
      <h2 style={{ margin: 0, fontSize: 52, fontWeight: 800, letterSpacing: "-0.03em", color: INK }}>
        {info.title}
      </h2>
      <p style={{ margin: 0, fontSize: 26, color: SUBTLE }}>{info.blurb}</p>
    </div>
  );
};

export const Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fade = 24;
  const seg = durationInFrames / 3;
  const monthOp = band(frame, 0, seg, fade);
  const weekOp = band(frame, seg, seg * 2, fade);
  const dayOp = band(frame, seg * 2, durationInFrames, fade);

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const rise = interpolate(enter, [0, 1], [60, 0]);

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {/* Captions live in the top band */}
      <div style={{ position: "absolute", top: 70, left: 0, right: 0, height: 170, opacity: enter }}>
        <Caption view="month" opacity={monthOp} />
        <Caption view="week" opacity={weekOp} />
        <Caption view="day" opacity={dayOp} />
      </div>

      {/* The live component, crossfading between views */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 56 }}>
        <div style={{ position: "relative", transform: `translateY(${rise}px) scale(${SCALE})`, transformOrigin: "bottom center" }}>
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", opacity: monthOp }}>
            <Window view="month" value={FOCUS_DATE} />
          </AbsoluteFill>
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", opacity: weekOp }}>
            <Window view="week" value={FOCUS_DATE} />
          </AbsoluteFill>
          <div style={{ opacity: dayOp }}>
            <Window view="day" value={FOCUS_DATE} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
