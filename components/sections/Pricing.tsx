"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { PlusMarker } from "@/components/ui/SectionMarkers";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    tier: "Starter",
    description:
      "Ideal for developers and small projects getting started in the cloud.",
    price: 6,
    featured: false,
    cta: "Start Free — $0 for 30 days",
    features: [
      "1 vCPU / 1 GB RAM",
      "25 GB SSD storage",
      "1 TB bandwidth",
      "1 cloud server",
      "Shared networking",
      "Community support",
    ],
  },
  {
    tier: "Professional",
    description:
      "Built for teams shipping production workloads that demand speed and reliability.",
    price: 20,
    featured: true,
    cta: "Choose Plan",
    features: [
      "4 vCPU / 8 GB RAM",
      "160 GB NVMe SSD",
      "5 TB bandwidth",
      "Up to 10 cloud servers",
      "Automated daily backups",
      "Private networking",
      "Priority email support",
    ],
  },
  {
    tier: "Enterprise",
    description:
      "Designed for large-scale infrastructure with dedicated resources and SLA guarantees.",
    price: 45,
    featured: false,
    cta: "Contact Sales",
    features: [
      "Unlimited vCPU & RAM",
      "Dedicated NVMe SSD",
      "Unlimited bandwidth",
      "Unlimited cloud servers",
      "Bare-metal option",
      "SLA target 99.95% monthly uptime (excl. scheduled maintenance)",
      "Custom integrations & API",
    ],
  },
] as const;

// ─── Feature list icon — neutral gray (reference: thin ring + check, not accent green)

function FeatureCheckIcon(): JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mt-[3px] shrink-0 text-[#b8b8b8] dark:text-slate-500"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Single pricing card ──────────────────────────────────────────────────────

function CornerDots({ featured }: { featured: boolean }): JSX.Element {
  return (
    <>
      {(["tl", "tr", "bl", "br"] as const).map((pos) => {
        const isTop = pos === "tl" || pos === "tr";
        const dotClass =
          featured && isTop
            ? "bg-white/50 dark:bg-white/25"
            : "bg-[#e5e5e5] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)] dark:bg-[#3f3f46] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]";
        return (
          <div
            key={pos}
            className={`pointer-events-none absolute z-20 h-[7px] w-[7px] rounded-full ${dotClass} ${
              pos === "tl" ? "left-[-18px] top-[-18px]" : ""
            } ${pos === "tr" ? "right-[-18px] top-[-18px]" : ""} ${
              pos === "bl" ? "bottom-[-18px] left-[-18px]" : ""
            } ${pos === "br" ? "bottom-[-18px] right-[-18px]" : ""}`}
          />
        );
      })}
    </>
  );
}

function PricingCard({
  plan,
  delay,
  onHoverStart,
  onHoverEnd,
}: {
  plan: (typeof PLANS)[number];
  delay: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}): JSX.Element {
  const { tier, description, price, featured, cta, features } = plan;

  const shellClass = `relative flex flex-col overflow-hidden rounded-[22px] border border-[#e8e8e8] bg-white dark:border-slate-600/80 dark:bg-[#121a2e] ${
    featured ? "" : "p-7"
  }`;

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        className={`${shellClass} p-0`}
      >
        <CornerDots featured />

        {/* Top: full-bleed sky photo. Dark: lift contrast + top-only scrim; soft fade into features (no harsh “black bar”). */}
        <div className="relative flex min-h-[320px] flex-col overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-[position:center_top] bg-no-repeat brightness-100 contrast-100 saturate-100 dark:brightness-[1.12] dark:contrast-[1.06] dark:saturate-[1.18]"
            style={{ backgroundImage: "url('/pricing-cloud.png')" }}
          />
          {/* Light: soft tint + fade into solid white features block */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-200/30 via-white/25 to-white dark:hidden" />
          {/* Dark: darken upper area for type; keep lower third clear so clouds stay bright — avoid full-height darkening to transparent */}
          <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(15,23,42,0.52)_0%,rgba(30,41,59,0.22)_38%,rgba(15,23,42,0.08)_62%,transparent_100%)] dark:block" />
          {/* Seamless handoff into features panel (matches dark:bg-[#121a2e] below) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-20 bg-gradient-to-b from-transparent via-[#121a2e]/65 to-[#121a2e] dark:block" />

          <div className="relative z-10 flex min-h-[320px] flex-col px-7 pb-8 pt-7">
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full border border-white/35 bg-white/20 px-3 py-[5px] text-[11px] font-medium text-white backdrop-blur-[6px]">
                {tier}
              </span>
            </div>
            <p className="mb-6 min-h-[52px] text-[13.5px] leading-[1.65] text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
              {description}
            </p>
            <div className="mb-6 flex items-baseline gap-[3px]">
              <span className="font-google-sans text-[56px] font-extrabold leading-none tracking-[-0.04em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
                ${price}
              </span>
              <span className="text-[18px] font-medium text-white/85">/month</span>
            </div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 22 } }}
              whileTap={{ scale: 0.97 }}
              className="mt-auto w-full rounded-full bg-[#111] py-[13px] text-[14px] font-semibold text-white transition-opacity duration-150 hover:opacity-90 dark:bg-[#0a0a0a]"
            >
              {cta}
            </motion.button>
          </div>
        </div>

        {/* Bottom: solid panel — light keeps hairline; dark uses gradient bridge above so border stays whisper-thin */}
        <div className="border-t border-[#f0f0f0] bg-white px-7 pb-7 pt-6 dark:border-slate-600/25 dark:bg-[#121a2e]">
          <p className="mb-4 text-[14px] font-medium text-[#444] dark:text-slate-200">What You Get</p>
          <ul className="space-y-[12px]">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-[10px]">
                <FeatureCheckIcon />
                <span className="text-[13.5px] leading-[1.5] text-[#666] dark:text-slate-400">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={shellClass}
    >
      <div className="relative z-10 flex flex-1 flex-col">
        <CornerDots featured={false} />

        <div className="mb-4">
          <span className="inline-flex items-center rounded-full border border-[#e5e5e5] bg-[#f2f2f2] px-3 py-[5px] text-[11px] font-medium text-[#666] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {tier}
          </span>
        </div>

        <p className="mb-6 min-h-[52px] text-[13.5px] leading-[1.65] text-[#888] dark:text-slate-400">
          {description}
        </p>

        <div className="mb-6 flex items-baseline gap-[3px]">
          <span className="font-google-sans text-[56px] font-extrabold leading-none tracking-[-0.04em] text-[#111] dark:text-slate-100">
            ${price}
          </span>
          <span className="text-[18px] font-medium text-[#aaa] dark:text-slate-500">/month</span>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 22 } }}
          whileTap={{ scale: 0.97 }}
          className="mb-8 w-full rounded-full border border-[#e0e0e0] bg-white py-[13px] text-[14px] font-semibold text-[#111] transition-opacity duration-150 hover:opacity-90 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        >
          {cta}
        </motion.button>

        <div className="border-t border-[#f0f0f0] pt-6 dark:border-slate-700">
          <p className="mb-4 text-[14px] font-medium text-[#444] dark:text-slate-200">What You Get</p>
          <ul className="space-y-[12px]">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-[10px]">
                <FeatureCheckIcon />
                <span className="text-[13.5px] leading-[1.5] text-[#666] dark:text-slate-400">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Pricing(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="bg-[var(--page-bg)] px-6 py-24 transition-colors duration-200 sm:px-10">
      <div className="mx-auto max-w-[1060px]">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2 className="mb-4 font-google-sans text-[clamp(28px,3.8vw,48px)] font-extrabold leading-[1.07] tracking-[-0.025em] text-[#111] dark:text-slate-100">
            Clear & Simple Pricing
          </h2>
          <p className="mx-auto max-w-[420px] text-[15.5px] leading-[1.65] text-[#555] dark:text-slate-400">
            No hidden fees. Pick the plan that fits your scale and upgrade any time.
          </p>
        </motion.div>

        {/* Grid wrapper with blueprint lines + corner markers */}
        <div ref={ref} className="relative z-0">
          {/* Horizontal fade lines */}
          <div className="absolute left-[-50vw] right-[-50vw] top-[13.5px] hidden h-px -translate-y-1/2 bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.07)_20%,rgba(0,0,0,0.07)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.07)_20%,rgba(255,255,255,0.07)_80%,transparent_100%)] md:block" />
          <div className="absolute bottom-[13.5px] left-[-50vw] right-[-50vw] hidden h-px translate-y-1/2 bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.07)_20%,rgba(0,0,0,0.07)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.07)_20%,rgba(255,255,255,0.07)_80%,transparent_100%)] md:block" />

          {/* Vertical fade lines (only on the far left and far right) */}
          <div className="absolute bottom-[-60px] left-[13.5px] top-[-60px] hidden w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.07)_15%,rgba(0,0,0,0.07)_85%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.07)_15%,rgba(255,255,255,0.07)_85%,transparent_100%)] md:block" />
          <div className="absolute bottom-[-60px] right-[13.5px] top-[-60px] hidden w-px translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.07)_15%,rgba(0,0,0,0.07)_85%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.07)_15%,rgba(255,255,255,0.07)_85%,transparent_100%)] md:block" />

          {/* 4 Corner + markers */}
          <div className="absolute left-[13.5px] top-[13.5px] hidden -translate-x-1/2 -translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 0} /></div>
          <div className="absolute right-[13.5px] top-[13.5px] hidden translate-x-1/2 -translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0.18} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 2} /></div>
          <div className="absolute bottom-[13.5px] left-[13.5px] hidden -translate-x-1/2 translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0.24} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 0} /></div>
          <div className="absolute bottom-[13.5px] right-[13.5px] hidden translate-x-1/2 translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0.42} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 2} /></div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PLANS.map((plan, i) => (
              <PricingCard
                key={plan.tier}
                plan={plan}
                delay={0.1 + i * 0.1}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
