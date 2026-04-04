"use client";

import { useDarkClass } from "@/lib/useDarkClass";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TrustedBy } from "@/components/ui/TrustedBy";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Corner Screw Dots ────────────────────────────────────────────────────────

function CornerDots(): JSX.Element {
  const dotClass =
    "absolute h-[7px] w-[7px] rounded-full bg-[#e5e5e5] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)] dark:bg-[#3f3f46] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]";
  return (
    <>
      <div className={`${dotClass} left-[10px] top-[10px]`} />
      <div className={`${dotClass} right-[10px] top-[10px]`} />
      <div className={`${dotClass} bottom-[10px] left-[10px]`} />
      <div className={`${dotClass} bottom-[10px] right-[10px]`} />
    </>
  );
}

// ─── Animated progress bar ────────────────────────────────────────────────────

function AnimBar({
  pct,
  color,
  delay = 0,
  variant = "emphasis",
}: {
  pct: number;
  color: string;
  delay?: number;
  /** emphasis: dark gray like last CPU bar (#555 in light); soft: lighter fill (#888 in light) */
  variant?: "emphasis" | "soft";
}): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const isDark = useDarkClass();
  const darkFill = variant === "soft" ? "#a1a1aa" : "#52525b";

  return (
    <div
      ref={ref}
      className="h-[5px] overflow-hidden rounded-full bg-[#f0f0f0] dark:bg-white/10"
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          ...(isDark ? { background: darkFill } : { background: color }),
        }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      />
    </div>
  );
}

// ─── Mini Mockup: Deploy Form (fully interactive) ─────────────────────────────

function DeployMockup(): JSX.Element {
  const osList = ["Ubuntu", "Debian", "CentOS"] as const;
  const plans = [
    { label: "1 vCPU", price: "$6/mo" },
    { label: "2 vCPU", price: "$12/mo" },
    { label: "4 vCPU", price: "$24/mo" },
  ] as const;
  const regions = ["🇺🇸 US East", "🇩🇪 EU West", "🇸🇬 AP South"] as const;

  const [activeOS, setActiveOS] = useState(0);
  const [activePlan, setActivePlan] = useState(1);
  const [activeRegion, setActiveRegion] = useState(0);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  function handleDeploy() {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => setState("done"), 1300);
    setTimeout(() => setState("idle"), 3200);
  }

  return (
    <div className="flex h-[260px] flex-col overflow-hidden rounded-[12px] border border-[#ebebeb] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] dark:border-slate-700 dark:bg-[#121a2e] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
      <div className="border-b border-[#f2f2f2] bg-[#fafafa] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.09em] text-[#aaa] dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-500">
        Create Server
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        {/* OS */}
        <div>
          <div className="mb-1.5 text-[9px] text-[#999] dark:text-slate-500">Select OS</div>
          <div className="flex gap-1.5">
            {osList.map((os, i) => (
              <motion.button
                key={os}
                type="button"
                onClick={() => setActiveOS(i)}
                whileTap={{ scale: 0.94 }}
                className={`flex-1 rounded-[6px] border py-1.5 text-center text-[9px] font-semibold transition-colors duration-150 cursor-pointer ${
                  activeOS === i
                    ? "border-[#111] bg-[#111] text-white dark:border-slate-200 dark:bg-slate-200 dark:text-slate-900"
                    : "border-[#e8e8e8] text-[#aaa] hover:border-[#ccc] hover:text-[#666] dark:border-slate-600 dark:text-slate-500 dark:hover:border-slate-500 dark:hover:text-slate-300"
                }`}
              >
                {os}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Plan */}
        <div>
          <div className="mb-1.5 text-[9px] text-[#999] dark:text-slate-500">Plan</div>
          <div className="flex gap-1.5">
            {plans.map((plan, i) => (
              <motion.button
                key={plan.label}
                type="button"
                onClick={() => setActivePlan(i)}
                whileTap={{ scale: 0.94 }}
                className={`flex-1 rounded-[6px] border p-1.5 cursor-pointer transition-colors duration-150 ${
                  activePlan === i
                    ? "border-[#111] bg-[#111] dark:border-slate-200 dark:bg-slate-200"
                    : "border-[#e8e8e8] bg-white hover:border-[#ccc] dark:border-slate-600 dark:bg-slate-800/40 dark:hover:border-slate-500"
                }`}
              >
                <div
                  className={`text-[9px] font-bold ${
                    activePlan === i
                      ? "text-white dark:text-slate-900"
                      : "text-[#222] dark:text-slate-200"
                  }`}
                >
                  {plan.label}
                </div>
                <div
                  className={`text-[8px] ${
                    activePlan === i ? "text-white/70 dark:text-slate-600" : "text-[#aaa] dark:text-slate-500"
                  }`}
                >
                  {plan.price}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div>
          <div className="mb-1.5 text-[9px] text-[#999] dark:text-slate-500">Region</div>
          <div className="flex gap-1.5">
            {regions.map((r, i) => (
              <motion.button
                key={r}
                type="button"
                onClick={() => setActiveRegion(i)}
                whileTap={{ scale: 0.94 }}
                className={`flex-1 rounded-[6px] border py-1 text-center text-[8px] cursor-pointer transition-colors duration-150 ${
                  activeRegion === i
                    ? "border-[#111] bg-[#f8f8f8] font-semibold text-[#111] dark:border-slate-300 dark:bg-slate-800 dark:text-slate-100"
                    : "border-[#e8e8e8] text-[#aaa] hover:border-[#ccc] dark:border-slate-600 dark:text-slate-500 dark:hover:border-slate-500"
                }`}
              >
                {r}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Deploy button */}
        <motion.button
          type="button"
          onClick={handleDeploy}
          whileTap={{ scale: 0.97 }}
          className={`w-full rounded-[7px] py-2 text-[10px] font-bold transition-colors duration-200 cursor-pointer ${
            state === "done"
              ? "bg-[#16a34a] text-white dark:bg-emerald-600"
              : state === "loading"
              ? "bg-[#555] text-white dark:bg-slate-600"
              : "bg-[#111] text-white hover:bg-[#333] dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
          }`}
        >
          {state === "loading" ? "Deploying…" : state === "done" ? "✓ Server Live" : "Deploy Now →"}
        </motion.button>
      </div>
    </div>
  );
}

// ─── Mini Mockup: Monitoring (animated bars) ──────────────────────────────────

function MonitoringMockup(): JSX.Element {
  const barRef = useRef<HTMLDivElement>(null);
  const inView = useInView(barRef, { once: true });
  const isDark = useDarkClass();
  const cpuData = [35, 42, 38, 55, 48, 62, 42, 58, 45, 38, 50, 42];
  const maxVal = Math.max(...cpuData);

  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <div className="flex h-[260px] flex-col overflow-hidden rounded-[12px] border border-[#ebebeb] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] dark:border-slate-700 dark:bg-[#121a2e] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-b border-[#f2f2f2] bg-[#fafafa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900/80">
        <span className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#aaa] dark:text-slate-500">
          Resource Monitor
        </span>
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-[4px] bg-[#dcfce7] px-[5px] py-[2px] text-[8px] font-semibold text-[#16a34a] dark:bg-emerald-950/60 dark:text-emerald-400"
        >
          ● Live
        </motion.span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        {/* CPU bar chart */}
        <div>
          <div className="mb-1.5 flex justify-between">
            <span className="text-[9px] font-semibold text-[#222] dark:text-slate-200">CPU Usage</span>
            <span className="text-[9px] font-bold text-[#111] dark:text-slate-100">
              {hoveredBar !== null ? `${cpuData[hoveredBar]}%` : "42%"}
            </span>
          </div>
          <div ref={barRef} className="flex h-[44px] items-end gap-[3px]">
            {cpuData.map((val, i) => (
              <motion.div
                key={i}
                onHoverStart={() => setHoveredBar(i)}
                onHoverEnd={() => setHoveredBar(null)}
                className="flex-1 cursor-pointer rounded-t-[2px]"
                initial={{ height: 0 }}
                animate={inView ? { height: `${(val / maxVal) * 100}%` } : { height: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.04 }}
                style={{
                  ...(isDark
                    ? {
                        background:
                          hoveredBar === i
                            ? "#ffffff"
                            : i === cpuData.length - 1
                              ? "#52525b"
                              : "#d4d4d8",
                      }
                    : {
                        background:
                          hoveredBar === i
                            ? "#111"
                            : i === cpuData.length - 1
                              ? "#555"
                              : `rgba(100,100,100,${0.18 + (i / cpuData.length) * 0.35})`,
                      }),
                }}
              />
            ))}
          </div>
        </div>

        {/* RAM */}
        <div>
          <div className="mb-1 flex justify-between text-[9px]">
            <span className="font-semibold text-[#222] dark:text-slate-200">RAM</span>
            <span className="text-[#aaa] dark:text-slate-500">6.2 / 8 GB</span>
          </div>
          <AnimBar pct={77} color="#555555" delay={0.15} variant="emphasis" />
        </div>

        {/* Network */}
        <div>
          <div className="mb-1 flex justify-between text-[9px]">
            <span className="font-semibold text-[#222] dark:text-slate-200">Network In</span>
            <span className="text-[#aaa] dark:text-slate-500">1.2 GB / 24h</span>
          </div>
          <AnimBar pct={24} color="#888888" delay={0.25} variant="soft" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex items-center gap-[5px] rounded-[6px] bg-[#f9fafb] p-2 dark:bg-slate-800/80"
        >
          <span className="text-[9px] text-[#888] dark:text-slate-500">✓</span>
          <span className="text-[9px] font-medium text-[#555] dark:text-slate-300">
            All metrics within normal thresholds
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Mini Mockup: Firewall (toggleable rules) ─────────────────────────────────

const INITIAL_RULES = [
  { action: "Allow", proto: "TCP", port: "80", source: "0.0.0.0/0", allow: true },
  { action: "Allow", proto: "TCP", port: "443", source: "0.0.0.0/0", allow: true },
  { action: "Allow", proto: "TCP", port: "22", source: "My IP", allow: true },
  { action: "Deny", proto: "All", port: "*", source: "0.0.0.0/0", allow: false },
];

function FirewallMockup(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [rules, setRules] = useState(INITIAL_RULES);
  const [hovered, setHovered] = useState<number | null>(null);

  function toggle(i: number) {
    setRules((prev) =>
      prev.map((r, idx) => (idx === i ? { ...r, allow: !r.allow, action: r.allow ? "Deny" : "Allow" } : r))
    );
  }

  return (
    <div
      ref={ref}
      className="flex h-[260px] flex-col overflow-hidden rounded-[12px] border border-[#ebebeb] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] dark:border-slate-700 dark:bg-[#121a2e] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-center justify-between border-b border-[#f2f2f2] bg-[#fafafa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900/80">
        <span className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#aaa] dark:text-slate-500">
          Firewall Rules
        </span>
        <span className="cursor-pointer text-[9px] font-semibold text-[#555] hover:text-[#111] dark:text-slate-400 dark:hover:text-slate-100">
          + Add Rule
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center divide-y divide-[#f5f5f5] dark:divide-slate-700">
        {rules.map((rule, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.35, ease: EASE, delay: 0.1 + i * 0.07 }}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            className="flex cursor-pointer items-center gap-2 px-3 py-[7px] transition-colors duration-100 hover:bg-[#fafafa] dark:hover:bg-slate-800/80"
            onClick={() => toggle(i)}
          >
            <motion.span
              layout
              className={`flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full ${
                rule.allow
                  ? "bg-[#dcfce7] text-[#16a34a] dark:bg-emerald-950/60 dark:text-emerald-400"
                  : "bg-[#fee2e2] text-[#dc2626] dark:bg-red-950/50 dark:text-red-400"
              }`}
              aria-hidden
            >
              {rule.allow ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="m9 12 2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="m15 9-6 6M9 9l6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </motion.span>
            <span
              className={`text-[9px] font-semibold ${
                rule.allow ? "text-[#222] dark:text-slate-200" : "text-[#dc2626] dark:text-red-400"
              }`}
            >
              {rule.action}
            </span>
            <span className="text-[9px] text-[#bbb] dark:text-slate-500">{rule.proto}</span>
            <span className="rounded-[3px] bg-[#f4f4f4] px-[4px] py-[1px] font-mono text-[8px] text-[#777] dark:bg-slate-700 dark:text-slate-300">
              :{rule.port}
            </span>
            <span className="ml-auto font-mono text-[8px] text-[#bbb] dark:text-slate-500">
              {rule.source}
            </span>
            {hovered === i && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[8px] text-[#888] dark:text-slate-500"
              >
                click to toggle
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
      <div className="border-t border-[#f2f2f2] bg-[#fafafa] px-3 py-2 dark:border-slate-700 dark:bg-slate-900/80">
        <div className="flex items-center gap-[5px]">
          <span className="h-[6px] w-[6px] rounded-full bg-[#22c55e]" />
          <span className="text-[9px] font-medium text-[#555] dark:text-slate-400">
            Firewall active · 3 servers protected
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

interface FeatureCardProps {
  pill: string;
  title: string;
  description: string;
  mockup: React.ReactNode;
  delay?: number;
}

function FeatureCard({ pill, title, description, mockup, delay = 0 }: FeatureCardProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 32 } }}
      className="relative flex h-full flex-col rounded-[22px] border border-[#e8e8e8] bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.05),0_2px_12px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-slate-700 dark:bg-[#121a2e] dark:shadow-[0_1px_4px_rgba(0,0,0,0.2),0_2px_12px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
    >
      {/* Vertical fade lines (blueprint grid effect) */}
      <div className="absolute bottom-[-240px] left-[13.5px] top-[-240px] hidden w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.06)_20%,rgba(0,0,0,0.06)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] md:block" />
      <div className="absolute bottom-[-240px] right-[13.5px] top-[-240px] hidden w-px translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.06)_20%,rgba(0,0,0,0.06)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] md:block" />

      <CornerDots />

      <div className="mb-5 flex justify-center">
        <div className="inline-flex items-center rounded-full border border-[#e5e5e5] bg-[#f2f2f2] px-3 py-[4px] text-[11px] font-medium text-[#666] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {pill}
        </div>
      </div>

      {/* Text */}
      <h3 className="mb-2.5 text-center text-[21px] font-bold leading-[1.2] tracking-[-0.018em] text-[#111] dark:text-slate-100">
        {title}
      </h3>
      <p className="mb-6 text-center text-[13.5px] leading-[1.65] text-[#888] dark:text-slate-400">
        {description}
      </p>

      {/* Mockup */}
      <div className="mt-auto flex flex-col pt-5">
        {mockup}
      </div>
    </motion.div>
  );
}

// ─── Card Grid with marker frame ─────────────────────────────────────────────

function CardGridFrame(): JSX.Element {
  return (
    <div className="relative z-0 grid grid-cols-1 gap-5 md:grid-cols-3">
      {/* Horizontal fade lines (blueprint grid effect) */}
      <div className="absolute left-[-50vw] right-[-50vw] top-[13.5px] hidden h-px -translate-y-1/2 bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.06)_20%,rgba(0,0,0,0.06)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] md:block" />
      <div className="absolute bottom-[13.5px] left-[-50vw] right-[-50vw] hidden h-px translate-y-1/2 bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.06)_20%,rgba(0,0,0,0.06)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] md:block" />

      <FeatureCard
        pill="Launch Instantly"
        title="Compute"
        description="Spin up SSD-backed VPS instances in under 60 seconds. Pick your OS, plan, and region — then click Deploy."
        mockup={<DeployMockup />}
        delay={0.18}
      />
      <FeatureCard
        pill="Full Visibility"
        title="Monitoring"
        description="Track CPU, RAM, and network in real time. Hover the bars, watch them pulse live, and catch issues before users do."
        mockup={<MonitoringMockup />}
        delay={0.28}
      />
      <FeatureCard
        pill="Stay Protected"
        title="Firewall"
        description="Define granular inbound rules per server. Click any rule below to toggle it — changes apply instantly at the edge."
        mockup={<FirewallMockup />}
        delay={0.38}
      />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ProductFeatures(): JSX.Element {
  return (
    <section className="bg-[var(--page-bg)] px-6 pb-24 pt-0 transition-colors duration-200 sm:px-10">
      {/* TrustedBy sits at the very top of this section — same background, no seam */}
      <TrustedBy />

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
            Craft Powerful Cloud Infrastructure
          </h2>
          <p className="mx-auto max-w-[460px] text-[15.5px] leading-[1.65] text-[#888] dark:text-slate-400">
            NimbusVPS brings essential cloud tools into one platform — deploy
            servers, monitor resources, and stay secure from a single panel.
          </p>
        </motion.div>

        {/* Card grid with animated marker frame */}
        <CardGridFrame />
      </div>
    </section>
  );
}
