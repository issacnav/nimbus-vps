"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Primitives ───────────────────────────────────────────────────────────────

/** Small gray circle — sits at column / corner junctions */
export function DotMarker({
  inView,
  delay,
}: {
  inView: boolean;
  delay: number;
}): JSX.Element {
  return (
    <motion.div
      className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#c8c8c8]"
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.28, delay, ease: EASE }}
    />
  );
}

/** Small cross / + shape — sits at section corners */
export function PlusMarker({
  inView,
  delay,
  size = 14,
  thickness = 1,
  color = "#bbb",
  isHovered = false,
}: {
  inView: boolean;
  delay: number;
  size?: number;
  thickness?: number;
  color?: string;
  isHovered?: boolean;
}): JSX.Element {
  return (
    <motion.div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      initial={{ scale: 0, opacity: 0, rotate: 0 }}
      animate={
        inView
          ? { scale: 1, opacity: 1, rotate: isHovered ? 90 : 0 }
          : { scale: 0, opacity: 0, rotate: 0 }
      }
      transition={{
        scale: { duration: 0.28, delay: inView && !isHovered ? delay : 0, ease: EASE },
        opacity: { duration: 0.28, delay: inView && !isHovered ? delay : 0, ease: EASE },
        rotate: { type: "spring", stiffness: 260, damping: 20 },
      }}
    >
      {/* horizontal arm */}
      <div
        className="absolute left-0 right-0 top-1/2"
        style={{ height: thickness, background: color, transform: "translateY(-50%)" }}
      />
      {/* vertical arm */}
      <div
        className="absolute bottom-0 left-1/2 top-0"
        style={{ width: thickness, background: color, transform: "translateX(-50%)" }}
      />
    </motion.div>
  );
}

/** A horizontal line that draws from its center outward */
export function AnimLine({
  inView,
  delay,
  color = "#e0e0e0",
}: {
  inView: boolean;
  delay: number;
  color?: string;
}): JSX.Element {
  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <motion.div
        className="h-px w-full"
        style={{ background: color, transformOrigin: "center" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      />
    </div>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────

interface MarkerRowProps {
  /** Number of *intermediate* markers between the two end markers (default 0) */
  intermediate?: number;
  markerType?: "dot" | "plus";
  inView: boolean;
  /** Base delay before anything starts (seconds) */
  baseDelay?: number;
  lineColor?: string;
  markerColor?: string;
}

/**
 * Renders: [marker] [line] ([marker] [line])* [marker]
 * Lines draw from center; markers pop in staggered.
 */
export function MarkerRow({
  intermediate = 0,
  markerType = "dot",
  inView,
  baseDelay = 0,
  lineColor = "#e0e0e0",
  markerColor = "#c0c0c0",
}: MarkerRowProps): JSX.Element {
  const totalMarkers = intermediate + 2;
  const items: JSX.Element[] = [];

  for (let i = 0; i < totalMarkers; i++) {
    const mDelay = baseDelay + i * 0.07;
    const lDelay = baseDelay + 0.08;

    if (i > 0) {
      items.push(
        <AnimLine key={`l-${i}`} inView={inView} delay={lDelay} color={lineColor} />
      );
    }

    items.push(
      markerType === "plus" ? (
        <PlusMarker
          key={`m-${i}`}
          inView={inView}
          delay={mDelay}
          color={markerColor}
          size={13}
          thickness={1.5}
        />
      ) : (
        <DotMarker key={`m-${i}`} inView={inView} delay={mDelay} />
      )
    );
  }

  return <div className="flex items-center">{items}</div>;
}

// ─── Self-contained (owns its own useInView ref) ──────────────────────────────

interface SelfContainedProps extends Omit<MarkerRowProps, "inView"> {
  className?: string;
}

export function AnimatedMarkerRow({
  className = "",
  ...props
}: SelfContainedProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={className}>
      <MarkerRow inView={inView} {...props} />
    </div>
  );
}
