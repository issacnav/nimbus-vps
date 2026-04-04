"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { VPSDashboard } from "./DashboardMockup";
import { VantaClouds } from "./VantaClouds";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const mockupY = useTransform(scrollY, [0, 500], [0, -28]);

  return (
    <>
      <VantaClouds />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] hidden h-[min(560px,85vh)] dark:block bg-[radial-gradient(ellipse_75%_55%_at_50%_36%,rgba(34,211,238,0.14)_0%,rgba(59,130,246,0.06)_42%,transparent_68%)]"
        aria-hidden
      />

      <section
        ref={sectionRef}
        className="relative z-10 px-6 pb-20 pt-[108px] text-center sm:px-10 sm:pb-24"
      >
        <div className="mx-auto flex max-w-[900px] flex-col items-center">
          <h1 className="mb-6 w-full text-center text-[clamp(36px,5vw,64px)] font-normal leading-[1.15] tracking-[-0.01em] text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.15)] dark:[text-shadow:0_4px_36px_rgba(0,0,0,0.45),0_0_60px_rgba(34,211,238,0.12)]">
            Deploy Cloud Servers
            <br />
            at Lightning Speed
          </h1>

          <p className="mb-12 max-w-[600px] text-center text-[clamp(16px,2vw,20px)] font-normal leading-[1.65] text-white/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.15)] dark:text-sky-100/85 dark:[text-shadow:0_2px_20px_rgba(0,0,0,0.35)]">
            Launch high-performance VPS instances globally in under 60 seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.025, transition: { type: "spring", stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
              className="rounded-full bg-[#1a1a1a] px-8 py-[14px] text-[15px] font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-colors duration-150 hover:bg-black dark:bg-slate-100 dark:text-slate-900 dark:shadow-[0_4px_14px_rgba(0,0,0,0.35)] dark:hover:bg-white"
            >
              Create a Free Account
            </motion.button>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-6 px-6 sm:px-10">
        <div className="relative z-20 mx-auto w-full max-w-[1060px]">
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
