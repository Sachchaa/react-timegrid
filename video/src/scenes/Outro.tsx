import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO, INK, SUBTLE, EVENT_COLORS } from "../theme";

const MiniMark: React.FC = () => (
  <div
    style={{
      width: 92,
      height: 92,
      borderRadius: 22,
      background: "#fff",
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 18px 44px -16px rgba(0,0,0,0.35)",
      padding: 12,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(4, 1fr)",
      gap: 6,
    }}
  >
    {Array.from({ length: 16 }).map((_, i) => {
      const filled = [2, 5, 9, 10, 13].includes(i);
      return (
        <div
          key={i}
          style={{
            borderRadius: 5,
            background: filled ? EVENT_COLORS[i % EVENT_COLORS.length] : "#f1f1f3",
          }}
        />
      );
    })}
  </div>
);

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const chip = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  const meta = spring({ frame: frame - 22, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ fontFamily: FONT, alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <div style={{ opacity: enter, transform: `scale(${interpolate(enter, [0, 1], [0.8, 1])})` }}>
          <MiniMark />
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: INK,
            opacity: enter,
            transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
          }}
        >
          Start building
        </h2>

        <div
          style={{
            fontFamily: MONO,
            fontSize: 30,
            color: "#525252",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 12px 34px -14px rgba(0,0,0,0.22)",
            borderRadius: 14,
            padding: "16px 26px",
            opacity: chip,
            transform: `translateY(${interpolate(chip, [0, 1], [18, 0])}px)`,
          }}
        >
          <span style={{ color: "#a3a3a3" }}>$ </span>npm i @codesutra/react-timegrid
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 24,
            color: SUBTLE,
            opacity: meta,
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1.5A10.5 10.5 0 0 0 8.68 22a.55.55 0 0 0 .74-.53v-1.86c-3 .65-3.6-1.27-3.6-1.27-.5-1.24-1.2-1.57-1.2-1.57-.98-.67.08-.66.08-.66 1.08.08 1.65 1.11 1.65 1.11.96 1.65 2.52 1.17 3.13.9.1-.7.38-1.17.68-1.44-2.4-.27-4.92-1.2-4.92-5.34 0-1.18.42-2.14 1.11-2.9-.11-.27-.48-1.37.11-2.85 0 0 .9-.29 2.96 1.1a10.3 10.3 0 0 1 5.4 0c2.05-1.39 2.95-1.1 2.95-1.1.59 1.48.22 2.58.11 2.85.69.76 1.1 1.72 1.1 2.9 0 4.15-2.52 5.06-4.93 5.33.39.34.73 1 .73 2.02v2.99c0 .29.2.63.75.52A10.5 10.5 0 0 0 12 1.5Z" />
            </svg>
            github.com/Sachchaa/react-timegrid
          </span>
          <span style={{ color: "#d4d4d4" }}>•</span>
          <span>MIT</span>
          <span style={{ color: "#d4d4d4" }}>•</span>
          <span>React 18 &amp; 19</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
