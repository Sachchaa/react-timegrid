export interface NavItem {
  title: string;
  path: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

/**
 * The documentation sidebar structure. Order here drives both the sidebar and
 * the prev/next pager at the bottom of each docs page.
 */
export const docsNav: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", path: "/docs" },
      { title: "Installation", path: "/docs/installation" },
      { title: "Quick Start", path: "/docs/quick-start" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Views", path: "/docs/views" },
      { title: "Events", path: "/docs/events" },
      { title: "Controlled & Uncontrolled", path: "/docs/controlled" },
      { title: "Internationalization", path: "/docs/i18n" },
      { title: "Theming", path: "/docs/theming" },
      { title: "Accessibility", path: "/docs/accessibility" },
      { title: "Server-side Rendering", path: "/docs/ssr" },
      { title: "Error Handling", path: "/docs/error-handling" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "<Calendar>", path: "/docs/api/calendar" },
      { title: "Types", path: "/docs/api/types" },
      { title: "Hooks", path: "/docs/api/hooks" },
    ],
  },
];

/** Flattened, in-order list used for the prev/next pager. */
export const flatDocsNav: NavItem[] = docsNav.flatMap((s) => s.items);
