import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO, INK, SUBTLE, EVENT_COLORS } from "../theme";

const LogoMark: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        width: 132,
        height: 132,
        borderRadius: 28,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 20px 50px -16px rgba(0,0,0,0.35)",
        padding: 16,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        gap: 8,
        transform: `scale(${interpolate(progress, [0, 1], [0.5, 1])}) rotate(${interpolate(progress, [0, 1], [-12, 0])}deg)`,
      }}
    >
      {Array.from({ length: 16 }).map((_, i) => {
        const filled = [2, 5, 9, 10, 13].includes(i);
        const color = EVENT_COLORS[i % EVENT_COLORS.length];
        return (
          <div
            key={i}
            style={{
              borderRadius: 7,
              background: filled ? color : "#f1f1f3",
              opacity: interpolate(progress, [0, 1], [0, filled ? 1 : 0.9]),
              transform: `scale(${interpolate(progress, [0, 1], [0.2, 1], { extrapolateRight: "clamp" })})`,
            }}
          />
        );
      })}
    </div>
  );
};

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const logoP = spring({ frame: frame - 2, fps, config: { damping: 14, mass: 0.7 } });
  const titleY = interpolate(spring({ frame: frame - 10, fps, config: { damping: 200 } }), [0, 1], [40, 0]);
  const subP = spring({ frame: frame - 22, fps, config: { damping: 200 } });
  const chipP = spring({ frame: frame - 32, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
        <div style={{ opacity: enter }}>
          <LogoMark progress={logoP} />
        </div>

        <div style={{ overflow: "hidden", paddingBottom: 8 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 116,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: INK,
              transform: `translateY(${titleY}px)`,
              opacity: interpolate(frame, [10, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            react-timegrid
          </h1>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 36,
            color: SUBTLE,
            whiteSpace: "nowrap",
            textAlign: "center",
            opacity: subP,
            transform: `translateY(${interpolate(subP, [0, 1], [16, 0])}px)`,
          }}
        >
          A full-featured React calendar — month, week &amp; day views
        </p>

        <div
          style={{
            marginTop: 14,
            fontFamily: MONO,
            fontSize: 26,
            color: "#525252",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 30px -12px rgba(0,0,0,0.2)",
            borderRadius: 12,
            padding: "14px 22px",
            opacity: chipP,
            transform: `translateY(${interpolate(chipP, [0, 1], [16, 0])}px)`,
          }}
        >
          <span style={{ color: "#a3a3a3" }}>$ </span>npm i @codesutra/react-timegrid
        </div>
      </div>
    </AbsoluteFill>
  );
};
