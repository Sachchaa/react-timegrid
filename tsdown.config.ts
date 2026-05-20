import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  clean: true,
  treeshake: true,
  dts: false,
  external: ["react", "react-dom"],
});
