"use client";

import { useTheme } from "./ThemeProvider";

function SunIcon(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle({
  className = "",
  placement = "hero",
}: {
  className?: string;
  /** hero: glass button on sky navbar. footer: solid control on light/dark page chrome */
  placement?: "hero" | "footer";
}): JSX.Element {
  const { theme, setTheme, mounted } = useTheme();
  const isDark = mounted && theme === "dark";

  const base =
    placement === "footer"
      ? "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2a2f38] bg-[#1a1d24] text-[#c4c9d4] transition-colors duration-150 hover:bg-[#22262e] dark:border-[#3d4554] dark:bg-[#1c212b] dark:text-[#e2e6ef] dark:hover:bg-[#252b38]"
      : "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors duration-150 hover:bg-white/20";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`${base} ${className}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
