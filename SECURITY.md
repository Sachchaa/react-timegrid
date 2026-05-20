# Security Policy

## Supported versions

Only the latest published minor version of `react-timegrid` receives security fixes. Pre-1.0 releases are best-effort.

## Reporting a vulnerability

Please report security issues privately rather than opening a public issue.

Use GitHub's "Report a vulnerability" button on the repository's Security tab (Private Vulnerability Reporting), or email the maintainer listed in `package.json`.

When reporting, include:

- A clear description of the issue and the impact you believe it has
- Steps to reproduce, ideally with a minimal repro repo or code sample
- The version of `react-timegrid` and React you tested with
- Any suggested mitigation

We will acknowledge receipt within 5 business days, share a remediation timeline, and credit reporters in the release notes unless they prefer otherwise.

## Scope

In scope:

- XSS, prototype pollution, or other injection vectors triggered through the library's documented public API
- Resource-exhaustion bugs reachable with realistic event volumes
- Unsafe DOM mutations or open redirects

Out of scope:

- Issues that require a compromised host application or modified bundle
- Bugs in third-party dependencies (please report upstream)
- Stylistic / a11y issues — open a regular GitHub issue for those
