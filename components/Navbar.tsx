"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ENTER_EASE = [0.22, 1, 0.36, 1] as const;

const navigationItems = [
  { label: "Products", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
] as const;

function CloudIcon(): JSX.Element {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="white" fillOpacity="0.15" />
      <path
        d="M20.5 17.5a3 3 0 0 0 0-6 3 3 0 0 0-5.6-1.4A4 4 0 1 0 9 17.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 17.5h11.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }): JSX.Element {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 top-0 h-[1.5px] w-5 rounded-full bg-white transition-transform duration-200 ${
          open ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[7px] h-[1.5px] w-5 rounded-full bg-white transition-opacity duration-200 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[14px] h-[1.5px] w-5 rounded-full bg-white transition-transform duration-200 ${
          open ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative z-[100] flex justify-center px-4 pt-5 sm:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: ENTER_EASE }}
        className="relative flex w-full max-w-[980px] items-center justify-between rounded-full border border-white/25 bg-white/[0.14] px-[18px] py-[8px] pr-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-[32px]"
      >
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-[9px]">
          <CloudIcon />
          <span className="text-[15px] font-semibold text-white tracking-[-0.01em]">
            NimbusVPS
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[14px] font-normal text-white/80 transition-colors duration-150 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          type="button"
          className="hidden shrink-0 items-center gap-[6px] rounded-full bg-[#0f172a] px-[18px] py-[9px] text-[13.5px] font-medium text-white transition-opacity duration-150 hover:opacity-90 md:inline-flex"
        >
          <span>Deploy Now</span>
          <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#22d3ee]" />
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 md:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <MenuIcon open={isMenuOpen} />
        </button>

        {/* Mobile menu dropdown */}
        {isMenuOpen ? (
          <div
            id="mobile-navigation"
            className="absolute left-0 top-[calc(100%+12px)] w-full rounded-[28px] border border-white/20 bg-white/[0.18] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-[32px] md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl px-3 py-2 text-[14px] font-normal text-white/80 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                className="mt-1 inline-flex items-center justify-center gap-[6px] rounded-full bg-[#0f172a] px-[18px] py-[9px] text-[13.5px] font-medium text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Deploy Now</span>
                <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#22d3ee]" />
              </button>
            </div>
          </div>
        ) : null}
      </motion.nav>
    </div>
  );
}
