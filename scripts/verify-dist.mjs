#!/usr/bin/env node
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const require = createRequire(import.meta.url);

const pkg = require(resolve(root, "package.json"));
const errors = [];

function checkFile(rel, { mustContain } = {}) {
  const abs = resolve(root, rel);
  if (!existsSync(abs)) {
    errors.push(`missing: ${rel}`);
    return;
  }
  if (statSync(abs).size === 0) {
    errors.push(`empty: ${rel}`);
    return;
  }
  if (mustContain) {
    const content = readFileSync(abs, "utf8");
    for (const needle of mustContain) {
      if (!content.includes(needle)) {
        errors.push(`${rel} missing expected content: ${needle}`);
      }
    }
  }
}

function walkExports(node, paths = []) {
  if (typeof node === "string") {
    paths.push(node);
    return paths;
  }
  if (node && typeof node === "object") {
    for (const v of Object.values(node)) walkExports(v, paths);
  }
  return paths;
}

const referenced = new Set(
  [pkg.main, pkg.module, pkg.types, ...walkExports(pkg.exports ?? {})].filter(Boolean)
);

for (const rel of referenced) {
  checkFile(rel, {
    mustContain: rel.endsWith(".cjs") ? ["exports"] : rel.endsWith(".js") ? ["export"] : undefined,
  });
}

// Canonical type entry must re-export the public surface.
checkFile("dist/index.d.ts", {
  mustContain: ["Calendar", "CalendarProps", "CalendarErrorBoundary", "useCalendarNav"],
});

// CSS bundle must ship.
checkFile("dist/styles.css");

if (errors.length) {
  console.error("dist verification failed:");
  for (const e of errors) console.error("  -", e);
  process.exit(1);
}

console.log("dist verification passed:");
for (const f of referenced) console.log("  ✓", f);
console.log("  ✓ dist/styles.css");
