"use client";

import { useDarkClass } from "@/lib/useDarkClass";
import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PlusMarker } from "@/components/ui/SectionMarkers";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1.6) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setCount(Math.round(v));
      },
    });
    return controls.stop;
  }, [inView, target, duration]);

  return { count, ref };
}

// ─── Animated Chart Bar ───────────────────────────────────────────────────────

function ChartBar({
  heightPct,
  delay,
  hovered,
  onHover,
}: {
  heightPct: number;
  delay: number;
  hovered: boolean;
  onHover: (v: boolean) => void;
}): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const isDark = useDarkClass();

  return (
    <motion.div
      ref={ref}
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      className="flex-1 cursor-pointer rounded-t-[3px] self-end"
      initial={{ height: 0 }}
      animate={inView ? { height: `${heightPct}%` } : { height: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      style={{
        ...(isDark
          ? { background: hovered ? "#ffffff" : "#d4d4d8" }
          : { background: hovered ? "#111111" : "#555555" }),
      }}
    />
  );
}

// ─── Weekly Chart ─────────────────────────────────────────────────────────────

function WeeklyChart(): JSX.Element {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cpuSeries = [38, 52, 44, 70, 58, 34, 48];
  const bwSeries = [22, 35, 28, 45, 38, 18, 30];
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [activeSeries, setActiveSeries] = useState<"both" | "cpu" | "bw">("both");

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#ebebeb] bg-[#fafafa] shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:border-slate-700 dark:bg-slate-900/60 dark:shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#f2f2f2] px-4 py-3 dark:border-slate-700">
        <div>
          <div className="text-[12px] font-bold text-[#111] dark:text-slate-100">Weekly Resource Usage</div>
          <div className="text-[10px] text-[#aaa] dark:text-slate-500">web-prod-01 · Last 7 days</div>
        </div>
        <div className="flex items-center gap-2">
          {/* Legend toggles */}
          {(["cpu", "bw"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() =>
                setActiveSeries((prev) => (prev === key ? "both" : key))
              }
              className={`flex cursor-pointer items-center gap-1 rounded-full px-2 py-[3px] text-[9px] font-medium transition-colors duration-150 ${
                activeSeries === key
                  ? "bg-[#f0f0f0] text-[#111] dark:bg-slate-800 dark:text-slate-100"
                  : "text-[#aaa] hover:text-[#555] dark:text-slate-500 dark:hover:text-slate-300"
              }`}
            >
              <span className="h-[6px] w-[6px] rounded-full bg-[#555] dark:bg-zinc-300" />
              {key === "cpu" ? "CPU" : "Bandwidth"}
            </button>
          ))}
          <div className="rounded-[5px] border border-[#e8e8e8] bg-[#f5f5f5] px-2 py-[3px] text-[9px] font-semibold text-[#888] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
            7d ▾
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 py-4">
        {hoveredDay !== null && (
          <motion.div
            key={hoveredDay}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 flex gap-3 text-[10px]"
          >
            <span className="font-semibold text-[#111] dark:text-slate-100">{days[hoveredDay]}</span>
            {(activeSeries === "both" || activeSeries === "cpu") && (
              <span className="text-[#555] dark:text-slate-400">CPU: {cpuSeries[hoveredDay]}%</span>
            )}
            {(activeSeries === "both" || activeSeries === "bw") && (
              <span className="text-[#555] dark:text-slate-400">BW: {bwSeries[hoveredDay]} GB</span>
            )}
          </motion.div>
        )}
        <div className={`flex h-[92px] items-end gap-2 ${hoveredDay !== null ? "" : "mt-[24px]"}`}>
          {days.map((day, i) => (
            <div
              key={day}
              className="flex flex-1 flex-col items-center gap-1"
              onMouseEnter={() => setHoveredDay(i)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <div className="flex w-full items-end gap-[2px]" style={{ height: "80px" }}>
                {(activeSeries === "both" || activeSeries === "cpu") && (
                  <ChartBar
                    heightPct={cpuSeries[i]}
                    delay={i * 0.06}
                    hovered={hoveredDay === i}
                    onHover={() => {}}
                  />
                )}
                {(activeSeries === "both" || activeSeries === "bw") && (
                  <ChartBar
                    heightPct={bwSeries[i]}
                    delay={i * 0.06 + 0.03}
                    hovered={hoveredDay === i}
                    onHover={() => {}}
                  />
                )}
              </div>
              <div
                className={`text-[8.5px] transition-colors ${
                  hoveredDay === i
                    ? "font-semibold text-[#111] dark:text-slate-100"
                    : "text-[#aaa] dark:text-slate-500"
                }`}
              >
                {day}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-3 divide-x divide-[#f0f0f0] border-t border-[#f0f0f0] dark:divide-slate-700 dark:border-slate-700">
        {[
          { label: "Peak CPU", value: "70%", sub: "Thursday" },
          { label: "Avg Bandwidth", value: "30 GB", sub: "Per day" },
          { label: "Incidents", value: "0", sub: "This week" },
        ].map((m) => (
          <div key={m.label} className="px-4 py-3">
            <div className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#aaa] dark:text-slate-500">
              {m.label}
            </div>
            <div className="mt-0.5 text-[14px] font-bold text-[#111] dark:text-slate-100">
              {m.value}
            </div>
            <div className="text-[9px] text-[#aaa] dark:text-slate-500">{m.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Feature Highlight (dark card) ───────────────────────────────────────────

function FeatureHighlight(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="overflow-hidden rounded-[22px] border border-[#e8e8e8] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:border-slate-700 dark:bg-[#121a2e] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
    >
      <div className="grid md:grid-cols-[1fr_1.45fr]">
        {/* Left — text */}
        <div className="flex flex-col justify-between p-8 md:p-10">
          <div>
            <div className="mb-5 inline-flex w-fit items-center rounded-full border border-[#e5e5e5] bg-[#f2f2f2] px-3 py-[5px] text-[11px] font-medium text-[#666] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Isolate Issues
            </div>
            <h3 className="mb-3 text-[clamp(20px,2.2vw,28px)] font-bold leading-[1.2] tracking-[-0.022em] text-[#111] dark:text-slate-100">
              Real-Time Server Monitoring
            </h3>
            <p className="text-[14px] leading-[1.72] text-[#888] dark:text-slate-400">
              Watch CPU, RAM, disk I/O, and network traffic live. Every spike
              is linked to your deployments — hover the bars and toggle series
              to isolate bottlenecks.
            </p>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 22 } }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#e0e0e0] bg-[#f2f2f2] px-5 py-[11px] text-[13px] font-semibold text-[#111] transition-colors duration-150 hover:bg-[#e8e8e8] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Explore Monitoring
            <span aria-hidden="true">→</span>
          </motion.button>
        </div>

        {/* Right — chart */}
        <div className="flex items-center border-t border-[#f0f0f0] bg-[#fafafa] p-6 dark:border-slate-700 dark:bg-slate-900/50 md:border-l md:border-t-0 md:p-8">
          <div className="w-full">
            <WeeklyChart />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stat Card (count-up) ─────────────────────────────────────────────────────

function StatCard({
  prefix,
  value,
  suffix,
  label,
  delay,
  onHoverStart,
  onHoverEnd,
}: {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}): JSX.Element {
  const { count, ref } = useCountUp(value, 1.8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 360, damping: 28 } }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="flex flex-col items-center justify-center px-8 py-9 text-center cursor-default"
    >
      <div className="mb-2.5 flex items-baseline gap-[2px]">
        {prefix && (
          <span className="font-google-sans text-[38px] font-extrabold leading-none tracking-[-0.03em] text-[#111] dark:text-slate-100">
            {prefix}
          </span>
        )}
        <span
          ref={ref}
          className="font-google-sans text-[48px] font-extrabold leading-none tracking-[-0.03em] text-[#111] dark:text-slate-100"
        >
          {count}
        </span>
        <span className="font-google-sans text-[26px] font-extrabold leading-none tracking-[-0.02em] text-[#666] dark:text-slate-400">
          {suffix}
        </span>
      </div>
      <p className="text-[13.5px] leading-[1.5] text-[#555] dark:text-slate-400">{label}</p>
    </motion.div>
  );
}

// ─── Stats frame with animated + markers ─────────────────────────────────────

function StatsFrame(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div ref={ref} className="relative z-0 mt-20">
      {/* Horizontal fade lines (blueprint grid effect) */}
      <div className="absolute left-[-50vw] right-[-50vw] top-0 hidden h-px -translate-y-1/2 bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.06)_20%,rgba(0,0,0,0.06)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] md:block" />
      <div className="absolute bottom-0 left-[-50vw] right-[-50vw] hidden h-px translate-y-1/2 bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.06)_20%,rgba(0,0,0,0.06)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] md:block" />

      {/* Vertical fade lines (blueprint grid effect) */}
      <div className="absolute bottom-[-100px] left-0 top-[-100px] hidden w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.06)_20%,rgba(0,0,0,0.06)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] md:block" />
      <div className="absolute bottom-[-100px] left-1/3 top-[-100px] hidden w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.06)_20%,rgba(0,0,0,0.06)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] md:block" />
      <div className="absolute bottom-[-100px] left-2/3 top-[-100px] hidden w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.06)_20%,rgba(0,0,0,0.06)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] md:block" />
      <div className="absolute bottom-[-100px] right-0 top-[-100px] hidden w-px translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.06)_20%,rgba(0,0,0,0.06)_80%,transparent_100%)] -z-10 dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] md:block" />

      {/* Top row markers */}
      <div className="absolute left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 0} /></div>
      <div className="absolute left-1/3 top-0 hidden -translate-x-1/2 -translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0.05} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 0 || hoveredCard === 1} /></div>
      <div className="absolute left-2/3 top-0 hidden -translate-x-1/2 -translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0.1} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 1 || hoveredCard === 2} /></div>
      <div className="absolute right-0 top-0 hidden translate-x-1/2 -translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0.15} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 2} /></div>

      {/* Stats container */}
      <motion.div
        className="overflow-hidden bg-transparent"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 divide-y divide-[rgba(0,0,0,0.06)] dark:divide-[rgba(255,255,255,0.08)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <StatCard value={99} suffix=".99%" label="Infra uptime for API & Console" delay={0.28} onHoverStart={() => setHoveredCard(0)} onHoverEnd={() => setHoveredCard(null)} />
          <StatCard prefix="<" value={1} suffix="ms" label="Post-init evaluation latency" delay={0.38} onHoverStart={() => setHoveredCard(1)} onHoverEnd={() => setHoveredCard(null)} />
          <StatCard value={50} suffix="B+" label="Network events processed per month" delay={0.48} onHoverStart={() => setHoveredCard(2)} onHoverEnd={() => setHoveredCard(null)} />
        </div>
      </motion.div>

      {/* Bottom row markers */}
      <div className="absolute bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0.3} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 0} /></div>
      <div className="absolute bottom-0 left-1/3 hidden -translate-x-1/2 translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0.35} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 0 || hoveredCard === 1} /></div>
      <div className="absolute bottom-0 left-2/3 hidden -translate-x-1/2 translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0.4} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 1 || hoveredCard === 2} /></div>
      <div className="absolute bottom-0 right-0 hidden translate-x-1/2 translate-y-1/2 md:block"><PlusMarker inView={inView} delay={0.45} size={14} thickness={1.5} color="#111" isHovered={hoveredCard === 2} /></div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function InfraStats(): JSX.Element {
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
            Supported by Reliable Infrastructure
          </h2>
          <p className="mx-auto max-w-[500px] text-[16px] leading-[1.65] text-[#555] dark:text-slate-400">
            NimbusVPS operates at global scale on bare-metal hardware, ensuring
            industry-leading uptime and single-digit millisecond performance.
          </p>
        </motion.div>

        {/* Feature card */}
        <div className="mb-10">
          <FeatureHighlight />
        </div>

        {/* ── Stats with animated + marker frame ── */}
        <StatsFrame />
      </div>
    </section>
  );
}
