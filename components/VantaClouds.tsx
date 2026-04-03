"use client";

import { useEffect, useRef, useState } from "react";

export function VantaClouds(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const THREE = await import("three");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const VANTA = (await import("vanta/dist/vanta.clouds.min")) as any;

      if (cancelled || !containerRef.current || vantaRef.current) return;

      vantaRef.current = VANTA.default({
        el: containerRef.current,
        THREE: THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        skyColor: 0x3fa8de,
        cloudColor: 0xffffff,
        cloudShadowColor: 0x3d6e90,
        sunColor: 0xff9422,
        sunGlareColor: 0xffe08a,
        sunlightColor: 0xfff4d0,
        speed: 0.38,
        zoom: 0.62,
      });

      if (!cancelled) setReady(true);
    }

    init();

    return () => {
      cancelled = true;
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  return (
    // overflow-hidden clips the rising canvas so it doesn't bleed outside the hero
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px] overflow-hidden bg-[linear-gradient(180deg,#3fa8de_0%,#62beea_30%,#a2dcf5_58%,#d6f0fa_78%,#ffffff_100%)]"
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
        className="absolute inset-x-0 top-0 z-[1] h-[520px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(63,168,222,1) 0%, rgba(63,168,222,0.95) 16%, rgba(63,168,222,0.72) 34%, rgba(63,168,222,0.22) 55%, transparent 100%)",
        }}
      />

      {/* Horizon white-fade */}
      <div className="absolute inset-x-0 bottom-0 z-[1] h-[340px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.28)_22%,rgba(255,255,255,0.70)_52%,rgba(255,255,255,0.94)_78%,#ffffff_100%)]" />
    </div>
  );
}
