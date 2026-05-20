---
"@codesutra/react-timegrid": minor
---

P1 production-readiness pass:

- `Calendar` now forwards refs to its root `<div>`.
- Internal error boundary wraps the calendar subtree; configurable via `errorFallback` and `onError`. The class is also exported as `CalendarErrorBoundary` for opt-in use elsewhere.
- SSR-safe: `useLayoutEffect` is swapped for `useEffect` when there is no DOM, and the popover guards `window` / `document` access.
- Accessibility: time slots are now real `<button>` elements with keyboard activation; the month-view grid is focusable; the time grid container is now a labelled `region` rather than an empty `grid`; event titles fall back to "Untitled event" so the `aria-label` is never blank. axe-core checks for all three views are part of the test suite.
- Test coverage is measured and enforced (80% statements / lines, 75% functions / branches).
- README documents styling, a11y, SSR, error handling, and the public hooks. CONTRIBUTING.md, SECURITY.md, issue templates, and a PR template added.

**Breaking:** the time-grid container's ARIA role changed from `grid` to `region`. Update any test selectors that queried `getByRole("grid", { name: "Time grid" })` to use `getByRole("region", { name: "Time grid" })`.
