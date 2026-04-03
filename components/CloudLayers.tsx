// Pure CSS multi-layer cloud parallax — no canvas, no WebGL.
// 4 layers drift left at increasing speeds; 1 counter-drifts right.
// Each layer duplicates its cloud set to create a seamless 200vw loop.

// ─── Cloud shapes (overlapping circles → natural cumulus silhouette) ──────────

function CloudA({ fill }: { fill: string }): JSX.Element {
  return (
    <svg width="320" height="132" viewBox="0 0 320 132" fill="none" aria-hidden="true">
      <g fill={fill}>
        <ellipse cx="160" cy="114" rx="149" ry="26" />
        <circle cx="72"  cy="88"  r="44" />
        <circle cx="141" cy="66"  r="57" />
        <circle cx="213" cy="74"  r="44" />
        <circle cx="272" cy="85"  r="35" />
        <circle cx="40"  cy="98"  r="26" />
        <circle cx="296" cy="96"  r="22" />
      </g>
    </svg>
  );
}

function CloudB({ fill }: { fill: string }): JSX.Element {
  return (
    <svg width="242" height="104" viewBox="0 0 242 104" fill="none" aria-hidden="true">
      <g fill={fill}>
        <ellipse cx="121" cy="87"  rx="111" ry="23" />
        <circle cx="64"  cy="66"  r="34" />
        <circle cx="121" cy="51"  r="42" />
        <circle cx="179" cy="59"  r="32" />
        <circle cx="209" cy="71"  r="22" />
        <circle cx="35"  cy="77"  r="20" />
      </g>
    </svg>
  );
}

function CloudC({ fill }: { fill: string }): JSX.Element {
  return (
    <svg width="184" height="82" viewBox="0 0 184 82" fill="none" aria-hidden="true">
      <g fill={fill}>
        <ellipse cx="92"  cy="69"  rx="83" ry="19" />
        <circle cx="51"  cy="54"  r="27" />
        <circle cx="94"  cy="42"  r="34" />
        <circle cx="141" cy="50"  r="25" />
        <circle cx="166" cy="60"  r="18" />
      </g>
    </svg>
  );
}

function CloudD({ fill }: { fill: string }): JSX.Element {
  // Wispy, horizontally elongated — perfect for distant & counter layers
  return (
    <svg width="296" height="72" viewBox="0 0 296 72" fill="none" aria-hidden="true">
      <g fill={fill}>
        <ellipse cx="148" cy="61"  rx="141" ry="17" />
        <circle cx="59"  cy="48"  r="23" />
        <circle cx="111" cy="38"  r="28" />
        <circle cx="174" cy="39"  r="26" />
        <circle cx="234" cy="45"  r="22" />
        <circle cx="269" cy="54"  r="17" />
      </g>
    </svg>
  );
}

// ─── Layer definitions ────────────────────────────────────────────────────────

type CloudDef = {
  Shape: (p: { fill: string }) => JSX.Element;
  /** left position in vw (0–100) within the first 100vw of the 200vw strip */
  xVw: number;
  /** top offset in px from the top of the 760px container */
  yPx: number;
  scale: number;
};

type LayerDef = {
  clouds: CloudDef[];
  /** total animation cycle in seconds */
  duration: number;
  blurPx: number;
  opacity: number;
  fill: string;
  /** negative = start mid-cycle (phase offset) */
  delayS: number;
  dir: "left" | "right";
  zIndex: number;
};

const LAYERS: LayerDef[] = [
  // ── Layer 1: distant background — tiny, heavy blur, glacial drift
  {
    clouds: [
      { Shape: CloudC, xVw: 4,  yPx: 476, scale: 0.62 },
      { Shape: CloudD, xVw: 22, yPx: 496, scale: 0.66 },
      { Shape: CloudC, xVw: 44, yPx: 469, scale: 0.60 },
      { Shape: CloudD, xVw: 64, yPx: 487, scale: 0.67 },
      { Shape: CloudC, xVw: 82, yPx: 478, scale: 0.63 },
      { Shape: CloudD, xVw: 94, yPx: 492, scale: 0.59 },
    ],
    duration: 260,
    blurPx: 4,
    opacity: 0.28,
    fill: "rgba(208,237,255,1)",
    delayS: 0,
    dir: "left",
    zIndex: 1,
  },

  // ── Layer 2: mid-background — moderate blur, medium pace
  {
    clouds: [
      { Shape: CloudB, xVw: 2,  yPx: 436, scale: 0.80 },
      { Shape: CloudA, xVw: 26, yPx: 416, scale: 0.82 },
      { Shape: CloudB, xVw: 52, yPx: 428, scale: 0.77 },
      { Shape: CloudA, xVw: 73, yPx: 418, scale: 0.80 },
      { Shape: CloudC, xVw: 91, yPx: 444, scale: 0.86 },
    ],
    duration: 165,
    blurPx: 2,
    opacity: 0.50,
    fill: "rgba(236,250,255,1)",
    delayS: -30,
    dir: "left",
    zIndex: 2,
  },

  // ── Layer 3: main cloud plane — nearly crisp, good volume
  {
    clouds: [
      { Shape: CloudA, xVw: 7,  yPx: 368, scale: 1.00 },
      { Shape: CloudB, xVw: 37, yPx: 384, scale: 0.95 },
      { Shape: CloudA, xVw: 64, yPx: 366, scale: 1.06 },
      { Shape: CloudB, xVw: 86, yPx: 380, scale: 0.92 },
    ],
    duration: 96,
    blurPx: 0.4,
    opacity: 0.80,
    fill: "#fff",
    delayS: -40,
    dir: "left",
    zIndex: 3,
  },

  // ── Layer 4: foreground — large, bright, fastest
  {
    clouds: [
      { Shape: CloudA, xVw: 16, yPx: 352, scale: 1.18 },
      { Shape: CloudB, xVw: 49, yPx: 358, scale: 1.12 },
      { Shape: CloudA, xVw: 76, yPx: 348, scale: 1.22 },
    ],
    duration: 66,
    blurPx: 0,
    opacity: 0.92,
    fill: "#fff",
    delayS: -14,
    dir: "left",
    zIndex: 4,
  },

  // ── Layer 5: counter-drift — wispy clouds moving opposite direction
  {
    clouds: [
      { Shape: CloudD, xVw: 11, yPx: 508, scale: 0.88 },
      { Shape: CloudD, xVw: 34, yPx: 517, scale: 0.84 },
      { Shape: CloudD, xVw: 60, yPx: 504, scale: 0.91 },
      { Shape: CloudD, xVw: 83, yPx: 513, scale: 0.86 },
    ],
    duration: 188,
    blurPx: 1.5,
    opacity: 0.36,
    fill: "rgba(240,252,255,1)",
    delayS: -94,
    dir: "right",
    zIndex: 2,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function CloudLayers(): JSX.Element {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px] bg-[linear-gradient(180deg,#3fa8de_0%,#62beea_30%,#a2dcf5_58%,#d6f0fa_78%,#ffffff_100%)]"
      aria-hidden="true"
    >
      {LAYERS.map((layer, li) => (
        <div
          key={li}
          className="absolute inset-0 overflow-hidden"
          style={{
            filter: layer.blurPx > 0 ? `blur(${layer.blurPx}px)` : undefined,
            opacity: layer.opacity,
            zIndex: layer.zIndex,
          }}
        >
          {/*
            Strip is 200vw wide.
            For left drift:  translateX(0) → translateX(-50%) moves it one 100vw page left.
            For right drift: translateX(-50%) → translateX(0) drifts the opposite direction.
            Clouds are placed at (xVw / 2)% of the 200vw strip for the first copy,
            and ((xVw + 100) / 2)% for the second copy — identical spacing, seamless loop.
          */}
          <div
            style={{
              position: "absolute",
              width: "200vw",
              height: "100%",
              animationName:
                layer.dir === "left" ? "clouds-drift-l" : "clouds-drift-r",
              animationDuration: `${layer.duration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `${layer.delayS}s`,
              willChange: "transform",
            }}
          >
            {([0, 100] as const).flatMap((offsetVw) =>
              layer.clouds.map((c, ci) => (
                <div
                  key={`${offsetVw}-${ci}`}
                  style={{
                    position: "absolute",
                    // (xVw + offset) as a % of the 200vw strip = divide by 2
                    left: `${(c.xVw + offsetVw) / 2}%`,
                    top: `${c.yPx}px`,
                    transform: `scale(${c.scale})`,
                    transformOrigin: "center bottom",
                  }}
                >
                  <c.Shape fill={layer.fill} />
                </div>
              ))
            )}
          </div>
        </div>
      ))}

      {/* Sky shield: solid sky at the top → transparent at ~55%
          Keeps hero text zone cloud-free while letting clouds breathe below. */}
      <div
        className="absolute inset-x-0 top-0 z-[10] h-[520px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(63,168,222,1) 0%, rgba(63,168,222,0.95) 16%, rgba(63,168,222,0.72) 34%, rgba(63,168,222,0.22) 55%, transparent 100%)",
        }}
      />

      {/* Horizon white-fade: dissolves into the white page below */}
      <div className="absolute inset-x-0 bottom-0 z-[10] h-[340px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.28)_22%,rgba(255,255,255,0.70)_52%,rgba(255,255,255,0.94)_78%,#ffffff_100%)]" />
    </div>
  );
}
