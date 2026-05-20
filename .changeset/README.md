# Changesets

This folder is used by [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs.

## Adding a changeset

When you make a user-facing change, run:

```sh
pnpm changeset
```

Follow the prompts to choose a semver bump (patch / minor / major) and write a short summary. This creates a markdown file in `.changeset/`. Commit it along with your code change.

When changesets land on `main`, the release workflow opens (or updates) a "Version Packages" PR. Merging that PR publishes to npm and pushes a git tag.
