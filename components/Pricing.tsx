"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { PlusMarker } from "./SectionMarkers";

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
      "SLA-backed 99.99% uptime",
      "Custom integrations & API",
    ],
  },
] as const;

// ─── Check icon ───────────────────────────────────────────────────────────────

function Check(): JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="mt-[3px] shrink-0"
    >
      <circle cx="7" cy="7" r="7" fill="#f4f4f4" />
      <path
        d="M4.5 7L6 8.5L9.5 5"
        stroke="#888"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Single pricing card ──────────────────────────────────────────────────────

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={`relative flex flex-col overflow-hidden rounded-[22px] border border-[#e8e8e8] bg-white p-7 ${
        featured
          ? "shadow-[0_24px_80px_rgba(63,168,222,0.15),0_4px_20px_rgba(0,0,0,0.08)]"
          : "shadow-[0_1px_4px_rgba(0,0,0,0.05),0_2px_12px_rgba(0,0,0,0.04)]"
      }`}
    >
      {/* Featured Sky Background (top half only) */}
      {featured && (
        <>
          {/* Base gradient */}
          <div className="absolute inset-x-0 top-0 h-[320px] bg-[linear-gradient(180deg,#70c4ed_0%,#d8f0fa_65%,#ffffff_100%)] z-0" />
          {/* Cloud image overlay */}
          <div
            className="absolute inset-x-0 top-0 h-[320px] z-0 opacity-80 mix-blend-overlay"
            style={{
              backgroundImage: "url('/pricing-cloud.png')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
            }}
          />
        </>
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Corner dots */}
        {(["tl", "tr", "bl", "br"] as const).map((pos) => {
          const isTop = pos === "tl" || pos === "tr";
          const dotClass =
            featured && isTop
              ? "bg-white/50"
              : "bg-[#e5e5e5] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]";
          return (
            <div
              key={pos}
              className={`absolute h-[7px] w-[7px] rounded-full ${dotClass} ${
                pos === "tl" ? "left-[-18px] top-[-18px]" : ""
              } ${pos === "tr" ? "right-[-18px] top-[-18px]" : ""} ${
                pos === "bl" ? "bottom-[-18px] left-[-18px]" : ""
              } ${pos === "br" ? "bottom-[-18px] right-[-18px]" : ""}`}
            />
          );
        })}

        {/* Tier badge */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center rounded-full px-3 py-[5px] text-[11px] font-medium ${
              featured
                ? "border border-white/30 bg-white/20 text-white"
                : "border border-[#e5e5e5] bg-[#f2f2f2] text-[#666]"
            }`}
          >
            {tier}
          </span>
        </div>

        {/* Description */}
        <p
          className={`mb-6 min-h-[52px] text-[13.5px] leading-[1.65] ${
            featured ? "text-white/90" : "text-[#888]"
          }`}
        >
          {description}
        </p>

        {/* Price */}
        <div className="mb-6 flex items-baseline gap-[3px]">
          <span
            className={`font-google-sans text-[56px] font-extrabold leading-none tracking-[-0.04em] ${
              featured ? "text-white" : "text-[#111]"
            }`}
          >
            ${price}
          </span>
          <span
            className={`text-[18px] font-medium ${
              featured ? "text-white/80" : "text-[#aaa]"
            }`}
          >
            /month
          </span>
        </div>

        {/* CTA */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 22 } }}
          whileTap={{ scale: 0.97 }}
          className={`mb-8 w-full rounded-full py-[13px] text-[14px] font-semibold transition-opacity duration-150 hover:opacity-90 ${
            featured
              ? "bg-[#222] text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
              : "border border-[#e0e0e0] bg-white text-[#111] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
          }`}
        >
          {cta}
        </motion.button>

        {/* Features */}
        <div className="border-t border-[#f0f0f0] pt-6">
          <p className="mb-4 text-[14px] font-medium text-[#444]">
            What You Get
          </p>
          <ul className="space-y-[12px]">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-[10px]">
                <Check />
                <span className="text-[13.5px] leading-[1.5] text-[#666]">
                  {f}
                </span>
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
    <section className="bg-[#f5f5f5] px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1060px]">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2 className="mb-4 font-google-sans text-[clamp(28px,3.8vw,48px)] font-extrabold leading-[1.07] tracking-[-0.025em] text-[#111]">
            Clear & Simple Pricing
          </h2>
          <p className="mx-auto max-w-[420px] text-[15.5px] leading-[1.65] text-[#555]">
            No hidden fees. Pick the plan that fits your scale and upgrade any time.
          </p>
        </motion.div>

        {/* Grid wrapper with blueprint lines + corner markers */}
        <div ref={ref} className="relative z-0">
          {/* Horizontal fade lines */}
          <div className="absolute left-[-50vw] right-[-50vw] top-[13.5px] hidden h-px -translate-y-1/2 bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.07)_20%,rgba(0,0,0,0.07)_80%,transparent_100%)] -z-10 md:block" />
          <div className="absolute bottom-[13.5px] left-[-50vw] right-[-50vw] hidden h-px translate-y-1/2 bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.07)_20%,rgba(0,0,0,0.07)_80%,transparent_100%)] -z-10 md:block" />

          {/* Vertical fade lines (only on the far left and far right) */}
          <div className="absolute bottom-[-60px] left-[13.5px] top-[-60px] hidden w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.07)_15%,rgba(0,0,0,0.07)_85%,transparent_100%)] -z-10 md:block" />
          <div className="absolute bottom-[-60px] right-[13.5px] top-[-60px] hidden w-px translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.07)_15%,rgba(0,0,0,0.07)_85%,transparent_100%)] -z-10 md:block" />

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
