import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}", "src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov", "json-summary"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.stories.{ts,tsx}",
        "src/index.ts",
        "src/types.ts",
        "src/hooks/index.ts",
      ],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 75,
        branches: 75,
      },
    },
  },
});
