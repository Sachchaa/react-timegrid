import { AbsoluteFill, useCurrentFrame } from "remotion";

/**
 * A clean, premium light backdrop: a soft neutral base with two slow-drifting
 * tinted blobs and a faint grid, matching the calendar's light shadcn theme.
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 24;
  const drift2 = Math.cos(frame / 110) * 30;

  return (
    <AbsoluteFill style={{ backgroundColor: "#fafafa" }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 78%)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(620px circle at ${22 + drift}% ${28 + drift2}%, rgba(99,102,241,0.16), transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(680px circle at ${82 - drift}% ${74 - drift2}%, rgba(236,72,153,0.12), transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 320px rgba(0,0,0,0.05)",
        }}
      />
    </AbsoluteFill>
  );
};
