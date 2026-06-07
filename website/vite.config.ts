import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const resolvePath = (p: string) => new URL(p, import.meta.url).pathname;

// The docs site imports the *real* library component straight from source
// (`../src`) so every demo always reflects the latest local code — no need to
// build the package first.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolvePath("./src"),
      "@timegrid": resolvePath("../src"),
    },
  },
});
