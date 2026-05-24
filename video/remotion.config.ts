import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";
import path from "path";

Config.setVideoImageFormat("jpeg");

/*
 * Use a system Chrome/Chromium when one is provided via env (e.g. CI or
 * sandboxes where Remotion can't download its own). On a normal machine these
 * are unset and Remotion uses its managed Chrome Headless Shell.
 */
const browserExecutable =
  process.env.CHROME_PATH ?? process.env.PUPPETEER_EXECUTABLE_PATH ?? null;
if (browserExecutable) {
  Config.setBrowserExecutable(browserExecutable);
}

/*
 * The <Calendar> is imported from ../../src (the library source), which has no
 * node_modules of its own. Pin react / react-dom to this project's copy (a
 * single React instance is required for hooks) and add this project's
 * node_modules to the resolution roots so the library's imports
 * (@internationalized/date, etc.) resolve here too.
 */
Config.overrideWebpackConfig((current) => {
  const withTailwind = enableTailwind(current);
  const nm = path.resolve(process.cwd(), "node_modules");
  return {
    ...withTailwind,
    resolve: {
      ...withTailwind.resolve,
      alias: {
        ...(withTailwind.resolve?.alias ?? {}),
        react: path.join(nm, "react"),
        "react-dom": path.join(nm, "react-dom"),
      },
      modules: [nm, "node_modules", ...((withTailwind.resolve?.modules as string[] | undefined) ?? [])],
    },
  };
});
