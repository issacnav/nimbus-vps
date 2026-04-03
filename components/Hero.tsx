"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { VantaClouds } from "./VantaClouds";

const EASE = [0.22, 1, 0.36, 1] as const;


// ─── Browser Chrome ───────────────────────────────────────────────────────────

function BrowserChrome(): JSX.Element {
  return (
    <div className="flex items-center gap-3 border-b border-[#e8e8e8] bg-[#f5f5f5] px-4 py-[10px]">
      <div className="flex items-center gap-[6px]">
        <div className="h-[11px] w-[11px] rounded-full bg-[#FF5F57]" />
        <div className="h-[11px] w-[11px] rounded-full bg-[#FEBC2E]" />
        <div className="h-[11px] w-[11px] rounded-full bg-[#28C840]" />
      </div>
      <div className="flex flex-1 justify-center">
        <div className="flex w-[240px] items-center justify-center gap-[6px] rounded-[6px] bg-white px-3 py-[4px] text-[11.5px] text-[#9ca3af] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <circle cx="5" cy="5" r="4" stroke="#9ca3af" strokeWidth="1" />
            <path d="M5 1c0 0-2 1.5-2 4s2 4 2 4" stroke="#9ca3af" strokeWidth="0.8" />
            <path d="M1 5h8" stroke="#9ca3af" strokeWidth="0.8" />
          </svg>
          console.nimbusvps.io
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar SVG icons ────────────────────────────────────────────────────────

function SbOverviewIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor" aria-hidden="true">
      <rect x="0"   y="0"   width="4.5" height="4.5" rx="1" />
      <rect x="6.5" y="0"   width="4.5" height="4.5" rx="1" />
      <rect x="0"   y="6.5" width="4.5" height="4.5" rx="1" />
      <rect x="6.5" y="6.5" width="4.5" height="4.5" rx="1" />
    </svg>
  );
}

function SbServerIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <rect x="0.5" y="0.5" width="10" height="4"  rx="1" />
      <rect x="0.5" y="6.5" width="10" height="4"  rx="1" />
      <circle cx="8.5" cy="2.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="8.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SbNetworkIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <circle cx="5.5" cy="2"   r="1.5" />
      <circle cx="2"   cy="9"   r="1.5" />
      <circle cx="9"   cy="9"   r="1.5" />
      <line x1="5.5" y1="3.5" x2="2.5"  y2="7.5" strokeLinecap="round" />
      <line x1="5.5" y1="3.5" x2="8.5"  y2="7.5" strokeLinecap="round" />
    </svg>
  );
}

function SbVolumeIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <ellipse cx="5.5" cy="3"   rx="4"   ry="1.5" />
      <line x1="1.5" y1="3"  x2="1.5" y2="8" strokeLinecap="round" />
      <line x1="9.5" y1="3"  x2="9.5" y2="8" strokeLinecap="round" />
      <ellipse cx="5.5" cy="8"   rx="4"   ry="1.5" />
    </svg>
  );
}

function SbSnapshotIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M1 4.5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1V9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4.5z" />
      <circle cx="5.5" cy="6.8" r="1.6" />
      <path d="M3.5 3.5 4 2h3l.5 1.5" strokeLinecap="round" />
    </svg>
  );
}

function SbFirewallIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 1 10 3.2V5.8C10 8.1 8 9.6 5.5 10 3 9.6 1 8.1 1 5.8V3.2L5.5 1z" />
    </svg>
  );
}

// ─── Stat pill SVG icons ──────────────────────────────────────────────────────

function GlobeIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <circle cx="5.5" cy="5.5" r="4.5" />
      <ellipse cx="5.5" cy="5.5" rx="2" ry="4.5" />
      <line x1="1" y1="5.5" x2="10" y2="5.5" />
    </svg>
  );
}

function LightningIcon(): JSX.Element {
  return (
    <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor" aria-hidden="true">
      <path d="M5.5 1 1 6.2h3.5L3 10 8.5 4.5H5L5.5 1z" />
    </svg>
  );
}

// ─── Dashboard Data ───────────────────────────────────────────────────────────

const sidebarItems = [
  { label: "Overview",   Icon: SbOverviewIcon,  active: false },
  { label: "Servers",    Icon: SbServerIcon,    active: true  },
  { label: "Networking", Icon: SbNetworkIcon,   active: false },
  { label: "Volumes",    Icon: SbVolumeIcon,    active: false },
  { label: "Snapshots",  Icon: SbSnapshotIcon,  active: false },
  { label: "Firewall",   Icon: SbFirewallIcon,  active: false },
];

const servers = [
  { name: "web-prod-01", region: "US East",  ip: "142.93.12.41",  cpu: 42, ram: 68, status: "Running" },
  { name: "api-gateway", region: "EU West",  ip: "165.22.197.8",  cpu: 27, ram: 45, status: "Running" },
  { name: "db-replica",  region: "AP South", ip: "206.189.78.3",  cpu: 14, ram: 81, status: "Running" },
] as const;

// ─── CPU Usage Bar ────────────────────────────────────────────────────────────

function UsageBar({ pct, color }: { pct: number; color: string }): JSX.Element {
  return (
    <div className="h-[4px] w-full overflow-hidden rounded-full bg-[#f0f0f2]">
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

// ─── VPS Dashboard Mockup ─────────────────────────────────────────────────────

function VPSDashboard(): JSX.Element {
  return (
    <div className="relative overflow-hidden rounded-[16px] bg-white shadow-[0_32px_120px_rgba(0,0,0,0.18),0_8px_32px_rgba(0,0,0,0.08)]">
      <BrowserChrome />

      {/* App header */}
      <div className="flex items-center justify-between border-b border-[#f0f0f0] bg-white px-4 py-[10px]">
        <div className="flex items-center gap-[8px]">
          <div className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-[#0284c7]">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              {/* Cloud icon — two bumps + flat base */}
              <circle cx="4.5" cy="7" r="3" fill="white" />
              <circle cx="7.5" cy="5.5" r="3.5" fill="white" />
              <circle cx="10" cy="7" r="2.5" fill="white" />
              <rect x="1.5" y="7" width="10" height="3" rx="1" fill="white" />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-[#0f172a] tracking-[-0.01em]">NimbusVPS</span>
          <span className="rounded-[4px] bg-[#f0f9ff] px-[6px] py-[2px] text-[9px] font-semibold uppercase tracking-[0.06em] text-[#0284c7]">
            Console
          </span>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex items-center gap-[5px] rounded-[6px] border border-[#e5e7eb] bg-[#fafafa] px-3 py-[5px] text-[11px] text-[#6b7280]">
            <span className="h-[6px] w-[6px] rounded-full bg-[#22c55e]" />
            All systems operational
          </div>
          <button
            type="button"
            className="rounded-[6px] bg-[#0284c7] px-3 py-[6px] text-[11.5px] font-semibold text-white shadow-[0_1px_4px_rgba(2,132,199,0.35)]"
          >
            + Deploy Server
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-[340px]">
        {/* Sidebar */}
        <div className="hidden w-[168px] shrink-0 flex-col border-r border-[#f0f0f0] bg-[#fafafa] py-3 sm:flex">
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              className={`mx-2 flex cursor-pointer items-center gap-[8px] rounded-[7px] px-3 py-[7px] text-[12px] ${
                item.active
                  ? "bg-[#eff6ff] font-semibold text-[#0284c7]"
                  : "text-[#6b7280] hover:bg-[#f3f4f6]"
              }`}
            >
              <span className="flex items-center opacity-70">
                <item.Icon />
              </span>
              <span>{item.label}</span>
              {item.active && (
                <span className="ml-auto h-[6px] w-[6px] rounded-full bg-[#22c55e]" />
              )}
            </div>
          ))}

          {/* Sidebar usage widget */}
          <div className="mx-2 mt-auto rounded-[8px] border border-[#e5e7eb] bg-white p-3">
            <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.07em] text-[#0284c7]">
              Resource Usage
            </div>
            <div className="mb-1.5">
              <div className="mb-1 flex justify-between text-[9px] text-[#9ca3af]">
                <span>CPU avg</span><span>28%</span>
              </div>
              <UsageBar pct={28} color="#0284c7" />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-[9px] text-[#9ca3af]">
                <span>RAM avg</span><span>65%</span>
              </div>
              <UsageBar pct={65} color="#7c3aed" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden px-5 py-4">
          {/* Top stat pills */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex items-center gap-[5px] rounded-[7px] border border-[#e5e7eb] bg-white px-3 py-[6px]">
              <span className="h-[6px] w-[6px] rounded-full bg-[#22c55e]" />
              <span className="text-[11px] font-semibold text-[#0f172a]">3</span>
              <span className="text-[11px] text-[#9ca3af]">Active Servers</span>
            </div>
            <div className="flex items-center gap-[5px] rounded-[7px] border border-[#e5e7eb] bg-white px-3 py-[6px] text-[#6b7280]">
              <GlobeIcon />
              <span className="text-[11px] font-semibold text-[#0f172a]">3</span>
              <span className="text-[11px] text-[#9ca3af]">Regions</span>
            </div>
            <div className="hidden items-center gap-[5px] rounded-[7px] border border-[#e5e7eb] bg-white px-3 py-[6px] text-[#6b7280] lg:flex">
              <LightningIcon />
              <span className="text-[11px] font-semibold text-[#0f172a]">99.99%</span>
              <span className="text-[11px] text-[#9ca3af]">Uptime</span>
            </div>
          </div>

          {/* Server list heading */}
          <div className="mb-2 flex items-center justify-between">
            <div>
              <div className="text-[13px] font-bold text-[#0f172a]">Your Servers</div>
              <div className="text-[10px] text-[#9ca3af]">3 instances across 3 regions</div>
            </div>
            <div className="hidden items-center gap-1.5 sm:flex">
              <div className="rounded-[5px] border border-[#e5e7eb] px-2 py-[3px] text-[9px] text-[#6b7280]">Filter</div>
              <div className="rounded-[5px] border border-[#e5e7eb] px-2 py-[3px] text-[9px] text-[#6b7280]">Sort</div>
            </div>
          </div>

          {/* Server table */}
          <div className="overflow-hidden rounded-[10px] border border-[#f0f0f2]">
            <div className="grid grid-cols-[1fr_auto_auto_80px_60px] gap-3 border-b border-[#f0f0f2] bg-[#fafafa] px-4 py-[7px] text-[9px] font-semibold uppercase tracking-[0.07em] text-[#9ca3af]">
              <span>Name</span>
              <span className="hidden sm:block">Region</span>
              <span className="hidden md:block">IP Address</span>
              <span>CPU</span>
              <span>Status</span>
            </div>

            {servers.map((server, idx) => (
              <div
                key={server.name}
                className={`grid grid-cols-[1fr_auto_auto_80px_60px] items-center gap-3 px-4 py-[9px] text-[11px] ${
                  idx < servers.length - 1 ? "border-b border-[#f0f0f2]" : ""
                }`}
              >
                <div>
                  <div className="font-semibold text-[#0f172a]">{server.name}</div>
                  <div className="text-[9px] text-[#9ca3af]">{server.ip}</div>
                </div>
                <div className="hidden text-[10px] text-[#6b7280] sm:block">{server.region}</div>
                <div className="hidden font-mono text-[10px] text-[#9ca3af] md:block">{server.ip}</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] text-[#9ca3af]">
                    <span>CPU</span><span>{server.cpu}%</span>
                  </div>
                  <UsageBar pct={server.cpu} color="#0284c7" />
                </div>
                <div>
                  <span className="rounded-[5px] bg-[#f0fdf4] px-[6px] py-[3px] text-[9px] font-semibold text-[#16a34a]">
                    ● {server.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom metrics row */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Avg CPU",      value: "28%",    sub: "Across all servers", bar: 28, color: "#0284c7" },
              { label: "Avg RAM",      value: "65%",    sub: "6.5 / 10 GB used",  bar: 65, color: "#7c3aed" },
              { label: "Network Out",  value: "2.4 GB", sub: "Last 24 hours",      bar: 48, color: "#0d9488" },
            ].map((metric) => (
              <div key={metric.label} className="rounded-[9px] border border-[#f0f0f2] bg-[#fafafa] p-3">
                <div className="mb-1 text-[9px] font-semibold uppercase tracking-[0.07em] text-[#9ca3af]">
                  {metric.label}
                </div>
                <div className="text-[18px] font-bold leading-none text-[#0f172a]">{metric.value}</div>
                <div className="mt-2">
                  <UsageBar pct={metric.bar} color={metric.color} />
                </div>
                <div className="mt-1 text-[9px] text-[#9ca3af]">{metric.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[140px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.55)_45%,rgba(255,255,255,0.97)_100%)]" />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const mockupY = useTransform(scrollY, [0, 500], [0, -28]);

  return (
    <>
      <VantaClouds />

      {/* Hero text */}
      <section
        ref={sectionRef}
        className="relative z-10 px-6 pb-20 pt-[108px] text-center sm:px-8 sm:pb-24"
      >
        <div className="mx-auto flex max-w-[900px] flex-col items-center">
          {/* Headline */}
          <h1
            className="mb-6 w-full text-center text-[clamp(36px,5vw,64px)] font-normal leading-[1.15] tracking-[-0.01em] text-white"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
          >
            <span className="block">Powering Product</span>
            <span className="block">Development with Data</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="mb-10 max-w-[760px] text-center text-[clamp(16px,2vw,20px)] font-normal leading-[1.6] text-white/90"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
          >
            Boost development speed & make smarter decisions with a unified platform
            <br className="hidden sm:block" />
            for experimentation, analytics, feature flags, and session replays
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.025, transition: { type: "spring", stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
              className="rounded-full bg-[#1a1a1a] px-8 py-[14px] text-[15px] font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-colors duration-150 hover:bg-black"
            >
              Create a Free Account
            </motion.button>
          </div>
        </div>
      </section>

      {/* Dashboard mockup */}
      <section className="relative z-20 -mt-6 px-6 sm:px-10">
        <div className="relative z-20 mx-auto max-w-[1020px]">
          <motion.div style={{ y: mockupY }}>
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <VPSDashboard />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
