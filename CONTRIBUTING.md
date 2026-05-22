# Contributing to react-timegrid

Thanks for your interest in contributing. This document covers the dev workflow.

## Prerequisites

- Node.js ≥ 20 (Node 18 is end-of-life and not supported)
- pnpm ≥ 10 (the repo pins `packageManager` so `corepack enable` is enough)

## Getting started

```sh
pnpm install
pnpm dev          # storybook on http://localhost:6006
pnpm test         # run unit tests
pnpm test:watch   # run tests in watch mode
pnpm build        # produce the dist/ tarball
```

## Before opening a PR

The CI workflow runs the following — please run them locally first:

```sh
pnpm run lint            # tsc --noEmit
pnpm run lint:eslint     # eslint .
pnpm run format:check    # prettier --check .
pnpm run test:coverage   # vitest run --coverage (enforces thresholds)
pnpm run build           # tsdown + tsc + tailwind
pnpm run verify:dist     # asserts dist matches package.json exports
```

`pnpm run format` and `pnpm run lint:eslint:fix` will auto-fix most issues.

## Writing tests

- Unit tests live under `tests/` and use Vitest + Testing Library.
- Accessibility regressions are covered by `tests/a11y.test.tsx` (axe-core). If you add a new view or interactive component, add an axe assertion for it.
- SSR safety is covered by `tests/ssr.test.tsx` — anything new that touches `window` / `document` must stay guarded.
- Coverage thresholds (80% lines / statements, 75% branches / functions) are enforced in CI.

## Commits & releases

Releases are fully automated with [semantic-release](https://semantic-release.gitbook.io/) and driven by your commit messages, so use [Conventional Commits](https://www.conventionalcommits.org/):

- `fix: ...` &rarr; patch release
- `feat: ...` &rarr; minor release
- `feat!: ...` or a `BREAKING CHANGE:` footer &rarr; major release
- `chore:` / `docs:` / `refactor:` / `test:` / etc. &rarr; no release

When a PR merges to `main`, the release workflow computes the next version from the commits, updates `CHANGELOG.md`, publishes to npm, and creates the GitHub release. No manual version bumps or changeset files are needed.

## Reporting issues

Use the issue templates under `.github/ISSUE_TEMPLATE/`. Security issues should go through the process described in [`SECURITY.md`](./SECURITY.md), not the public issue tracker.

## Code style

- TypeScript strict mode is non-negotiable.
- ESLint + Prettier are the source of truth for style. Don't argue with them in PRs; argue in `eslint.config.js` / `.prettierrc.json`.
- Don't add comments that just describe what the code does — only describe the *why* when it's non-obvious.
