import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background } from "./components/Background";
import { Intro } from "./scenes/Intro";
import { Showcase } from "./scenes/Showcase";
import { Features } from "./scenes/Features";
import { Outro } from "./scenes/Outro";

const INTRO = 90;
const SHOWCASE = 560;
const FEATURES = 150;
const OUTRO = 110;
const TRANSITION = 18;

export const PROMO_DURATION = INTRO + SHOWCASE + FEATURES + OUTRO - 3 * TRANSITION;

const transition = (
  <TransitionSeries.Transition
    timing={linearTiming({ durationInFrames: TRANSITION })}
    presentation={fade()}
  />
);

export const Promo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO}>
          <Intro />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence durationInFrames={SHOWCASE}>
          <Showcase />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence durationInFrames={FEATURES}>
          <Features />
        </TransitionSeries.Sequence>
        {transition}
        <TransitionSeries.Sequence durationInFrames={OUTRO}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
