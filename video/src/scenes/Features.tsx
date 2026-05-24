import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, INK, SUBTLE, ACCENT } from "../theme";

type Feature = { title: string; body: string; path: React.ReactNode };

const icon = (d: React.ReactNode) => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const FEATURES: Feature[] = [
  {
    title: "Three views",
    body: "Month, week & day with seamless switching.",
    path: icon(<><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></>),
  },
  {
    title: "Internationalized",
    body: "50+ locales via @internationalized/date, incl. non-Gregorian calendars.",
    path: icon(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>),
  },
  {
    title: "Accessible",
    body: "WAI-ARIA grid, keyboard nav, and screen-reader labels.",
    path: icon(<><circle cx="12" cy="5" r="2" /><path d="M5 8h14M12 8v6M9 21l3-7 3 7" /></>),
  },
  {
    title: "Lightweight",
    body: "One ~8KB runtime dependency. No heavy date libraries.",
    path: icon(<><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></>),
  },
  {
    title: "Controlled or not",
    body: "View, date & selection work controlled and uncontrolled.",
    path: icon(<><path d="M4 8h11M4 16h7" /><circle cx="18" cy="8" r="2.5" /><circle cx="14" cy="16" r="2.5" /></>),
  },
  {
    title: "Themeable & typed",
    body: "Retheme with CSS variables. Fully typed, SSR-safe.",
    path: icon(<><circle cx="13" cy="11" r="8" /><path d="M13 3v16M5 11h16" /></>),
  },
];

const Card: React.FC<{ f: Feature; delay: number }> = ({ f, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 18,
        padding: "30px 32px",
        boxShadow: "0 14px 34px -18px rgba(0,0,0,0.25)",
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: 14,
          display: "grid",
          placeItems: "center",
          color: ACCENT,
          background: "rgba(99,102,241,0.1)",
        }}
      >
        {f.path}
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, color: INK, letterSpacing: "-0.02em" }}>{f.title}</div>
      <div style={{ fontSize: 21, lineHeight: 1.4, color: SUBTLE }}>{f.body}</div>
    </div>
  );
};

export const Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ fontFamily: FONT, alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 1560 }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 44,
            opacity: head,
            transform: `translateY(${interpolate(head, [0, 1], [24, 0])}px)`,
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.18em", color: ACCENT, textTransform: "uppercase" }}>
            Why react-timegrid
          </span>
          <h2 style={{ margin: "10px 0 0", fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", color: INK }}>
            Everything you need
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26 }}>
          {FEATURES.map((f, i) => (
            <Card key={f.title} f={f} delay={8 + i * 5} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
