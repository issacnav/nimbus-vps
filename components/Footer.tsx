"use client";

import { ThemeToggle } from "./ThemeToggle";

const LINKS = {
  Product: ["Compute", "Networking", "Volumes", "Snapshots", "Firewall"],
  Developers: ["Documentation", "API Reference", "CLI", "Status", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
} as const;

function NimbusLogo(): JSX.Element {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className="text-[#0f172a] dark:text-[#e2e8f0]"
    >
      <circle cx="7" cy="13" r="5" fill="currentColor" />
      <circle cx="12" cy="10" r="6.5" fill="currentColor" />
      <circle cx="17" cy="13" r="4" fill="currentColor" />
      <rect x="2" y="13" width="18" height="4" rx="2" fill="currentColor" />
    </svg>
  );
}

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-[#ebebeb] bg-[var(--page-bg)] px-6 transition-colors duration-200 dark:border-[#2a2f38] sm:px-10">
      <div className="mx-auto max-w-[1060px]">
        {/* Top row */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-[9px]">
              <NimbusLogo />
              <span className="text-[15px] font-semibold tracking-[-0.01em] text-[#0f172a] dark:text-[#f1f5f9]">
                NimbusVPS
              </span>
            </div>
            <p className="mb-6 max-w-[220px] text-[13px] leading-[1.65] text-[#888] dark:text-[#94a3b8]">
              High-performance cloud servers deployed in seconds. Built for teams that ship fast.
            </p>
            <div className="flex items-center gap-2">
              <span className="h-[7px] w-[7px] rounded-full bg-[#22c55e]" />
              <span className="text-[12px] text-[#555] dark:text-[#a1a1aa]">
                All systems operational
              </span>
            </div>
          </div>

          {/* Link columns */}
          {(Object.entries(LINKS) as [string, readonly string[]][]).map(([group, items]) => (
            <div key={group}>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.07em] text-[#aaa] dark:text-[#64748b]">
                {group}
              </div>
              <ul className="space-y-[10px]">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[13.5px] text-[#555] transition-colors duration-150 hover:text-[#111] dark:text-[#94a3b8] dark:hover:text-[#f1f5f9]"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-[#f0f0f0] py-6 dark:border-[#2a2f38] sm:flex-row sm:items-center">
          <p className="text-[12.5px] text-[#aaa] dark:text-[#64748b]">
            © {new Date().getFullYear()} NimbusVPS, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <ThemeToggle placement="footer" />
            {["Twitter", "GitHub", "Discord"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[12.5px] text-[#aaa] transition-colors duration-150 hover:text-[#555] dark:text-[#64748b] dark:hover:text-[#cbd5e1]"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
