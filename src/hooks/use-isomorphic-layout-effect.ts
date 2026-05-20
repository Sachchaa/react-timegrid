import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect emits a warning during SSR because it has no observable
// effect on the server. Falling back to useEffect on the server keeps the
// component tree silent there while preserving sync layout behaviour on
// the client.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
