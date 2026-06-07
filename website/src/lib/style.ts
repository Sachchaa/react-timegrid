import type { CSSProperties } from "react";

/** CSSProperties that also permits arbitrary CSS custom properties. */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;
