import { useState } from "react";
import { CopyButton } from "./CopyButton";
import { site } from "../data/site";

const managers = {
  pnpm: `pnpm add ${site.pkg}`,
  npm: `npm install ${site.pkg}`,
  yarn: `yarn add ${site.pkg}`,
  bun: `bun add ${site.pkg}`,
} as const;

type Manager = keyof typeof managers;
const order: Manager[] = ["pnpm", "npm", "yarn", "bun"];

export function InstallTabs({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<Manager>("pnpm");
  const command = managers[active];

  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-[#0c0c10] ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-2">
        <div className="flex">
          {order.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setActive(m)}
              className={`relative px-3.5 py-2.5 font-mono text-xs transition-colors ${
                active === m ? "text-white" : "text-white/45 hover:text-white/75"
              }`}
            >
              {m}
              {active === m && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[var(--brand)]" />
              )}
            </button>
          ))}
        </div>
        <CopyButton
          value={command}
          className="mr-1 border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
        />
      </div>
      <div className="flex items-center gap-3 px-4 py-3.5 font-mono text-sm">
        <span className="select-none text-[var(--brand)]">$</span>
        <code className="text-white/90">{command}</code>
      </div>
    </div>
  );
}
