import { useId } from "react";

export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="react-timegrid logo"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--brand)" />
          <stop offset="1" stopColor="var(--brand-2)" />
        </linearGradient>
      </defs>
      <rect x="2" y="3" width="28" height="26" rx="7" fill={`url(#${id}-g)`} />
      <rect x="2" y="3" width="28" height="26" rx="7" fill="black" fillOpacity="0.05" />
      {/* header bar ticks */}
      <rect x="9" y="1.5" width="2.4" height="5" rx="1.2" fill="var(--brand)" />
      <rect x="20.6" y="1.5" width="2.4" height="5" rx="1.2" fill="var(--brand)" />
      {/* grid */}
      <g fill="white">
        <rect x="7" y="12" width="5" height="4" rx="1.2" fillOpacity="0.55" />
        <rect x="14" y="12" width="5" height="4" rx="1.2" fillOpacity="0.9" />
        <rect x="21" y="12" width="4" height="4" rx="1.2" fillOpacity="0.55" />
        <rect x="7" y="18" width="5" height="4" rx="1.2" fillOpacity="0.9" />
        <rect x="14" y="18" width="5" height="4" rx="1.2" fillOpacity="0.55" />
        <rect x="21" y="18" width="4" height="7" rx="1.2" fillOpacity="0.9" />
      </g>
    </svg>
  );
}
