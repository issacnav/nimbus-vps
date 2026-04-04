"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

function isDarkDocument() {
  return document.documentElement.classList.contains("dark");
}

const LIGHT = {
  skyColor: 0x3fa8de,
  cloudColor: 0xffffff,
  cloudShadowColor: 0x3d6e90,
  sunColor: 0xff9422,
  sunGlareColor: 0xffe08a,
  sunlightColor: 0xfff4d0,
} as const;

const DARK = {
  skyColor: 0x0f2847,
  cloudColor: 0x7c8ea3,
  cloudShadowColor: 0x24364f,
  sunColor: 0xffb020,
  sunGlareColor: 0xf59e0b,
  sunlightColor: 0xfde68a,
} as const;

export function VantaClouds(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const THREE = await import("three");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const VANTA = (await import("vanta/dist/vanta.clouds.min")) as any;

        if (cancelled || !containerRef.current) return;

        if (vantaRef.current) {
          try {
            vantaRef.current.destroy();
          } catch {
            /* ignore */
          }
          vantaRef.current = null;
        }

        const palette = isDarkDocument() ? DARK : LIGHT;

        vantaRef.current = VANTA.default({
          el: containerRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          skyColor: palette.skyColor,
          cloudColor: palette.cloudColor,
          cloudShadowColor: palette.cloudShadowColor,
          sunColor: palette.sunColor,
          sunGlareColor: palette.sunGlareColor,
          sunlightColor: palette.sunlightColor,
          speed: 0.38,
          zoom: 0.62,
        });

        if (!cancelled) setReady(true);
      } catch (e) {
        console.error("[VantaClouds]", e);
        if (!cancelled) setReady(true);
      }
    }

    setReady(false);
    void init();

    return () => {
      cancelled = true;
      if (vantaRef.current) {
        try {
          vantaRef.current.destroy();
        } catch {
          /* ignore */
        }
        vantaRef.current = null;
      }
    };
  }, [theme]);

  return (
    // overflow-hidden clips the rising canvas so it doesn't bleed outside the hero
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px] overflow-hidden bg-[linear-gradient(180deg,#3fa8de_0%,#62beea_30%,#a2dcf5_58%,#d6f0fa_78%,#ffffff_100%)] dark:bg-[linear-gradient(180deg,#071422_0%,#0f2847_28%,#163a5c_52%,#1a3d5c_72%,#0a0f18_100%)]"
      aria-hidden="true"
    >
      {/*
        Two-property transition:
        - opacity eases in gently (ease-in so it stays invisible a beat, then blooms in)
        - translateY shifts from +80px → 0 with easeOutExpo so clouds rise smoothly
        Both run over 2.6 s so the entrance never feels abrupt.
        The sky gradient shows underneath the whole time → no blank frame ever.
      */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0px)" : "translateY(80px)",
          transition: ready
            ? "opacity 2600ms ease-in-out, transform 2600ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
          willChange: "opacity, transform",
        }}
      />

      {/* Sky shield — always on top of the canvas, keeps text zone clean */}
      <div
        className="absolute inset-x-0 top-0 z-[1] h-[520px] bg-[linear-gradient(to_bottom,rgba(63,168,222,1)_0%,rgba(63,168,222,0.95)_16%,rgba(63,168,222,0.72)_34%,rgba(63,168,222,0.22)_55%,transparent_100%)] dark:bg-[linear-gradient(to_bottom,rgba(15,40,72,0.97)_0%,rgba(20,55,90,0.85)_14%,rgba(34,100,140,0.45)_38%,rgba(56,189,248,0.12)_55%,transparent_100%)]"
      />

      {/* Horizon white-fade */}
      <div className="absolute inset-x-0 bottom-0 z-[1] h-[340px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.28)_22%,rgba(255,255,255,0.70)_52%,rgba(255,255,255,0.94)_78%,#ffffff_100%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(10,15,24,0.15)_20%,rgba(10,15,24,0.65)_48%,rgba(10,15,24,0.92)_78%,#0a0f18_100%)]" />
    </div>
  );
}
