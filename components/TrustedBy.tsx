"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Brand SVG marks ──────────────────────────────────────────────────────────
// All marks use currentColor so the parent hover transition controls their tint.

function StripeIcon(): JSX.Element {
  // Stylised "S" formed by two offset arcs — echoes the Stripe brand shape
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
      <path
        d="M13.5 6.5C12.3 4.6 10.3 3.5 8 3.5C4.7 3.5 2 5.8 2 8.8C2 11.4 3.8 12.7 7 13.7C9.3 14.4 10.5 15 10.5 16.2C10.5 17.5 9.2 18.2 7.5 18.2C5.6 18.2 4 17.2 3 15.7L1 18C2.4 20 4.7 21 7.5 21C11.1 21 14 18.8 14 15.8C14 13 11.9 11.6 8.9 10.7C6.8 10 5.5 9.5 5.5 8.2C5.5 7.1 6.6 6.3 8 6.3C9.6 6.3 10.9 7.1 11.6 8.4L13.5 6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function VercelIcon(): JSX.Element {
  // Their exact logo — a pure equilateral triangle
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor" aria-hidden="true">
      <path d="M8 0L16 14H0L8 0Z" />
    </svg>
  );
}

function CloudflareIcon(): JSX.Element {
  // Cloud silhouette with their characteristic two-bump profile
  return (
    <svg width="22" height="14" viewBox="0 0 44 26" fill="none" aria-hidden="true">
      <path
        d="M33 10A11 11 0 0 0 12 8.5 8 8 0 0 0 13 25H33A7 7 0 0 0 33 10Z"
        fill="currentColor"
      />
      <path
        d="M37.5 14A4.5 4.5 0 0 0 29.5 12.5 3 3 0 0 0 30 20H37.5A3.5 3.5 0 0 0 37.5 14Z"
        fill="currentColor"
        fillOpacity="0.45"
      />
    </svg>
  );
}

function ShopifyIcon(): JSX.Element {
  // Shopping bag outline with the iconic handle arc
  return (
    <svg width="14" height="17" viewBox="0 0 28 34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12H23L21 32H7L5 12Z" />
      <path d="M10 12C10 8.5 11.8 6 14 6C16.2 6 18 8.5 18 12" />
    </svg>
  );
}

function TwilioIcon(): JSX.Element {
  // Circle with inner filled circle — their iconic two-dot mark simplified
  return (
    <svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="11" cy="13" r="3" fill="currentColor" />
      <circle cx="21" cy="13" r="3" fill="currentColor" />
      <circle cx="16" cy="21" r="3" fill="currentColor" />
    </svg>
  );
}

function HashiCorpIcon(): JSX.Element {
  // Diamond with an inset H — their hexagonal mark
  return (
    <svg width="16" height="17" viewBox="0 0 32 34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 2L30 10V24L16 32L2 24V10L16 2Z" />
      <path d="M10 13V21M22 13V21M10 17H22" strokeLinecap="round" />
    </svg>
  );
}

// ─── Logo list ────────────────────────────────────────────────────────────────

const LOGOS = [
  { name: "Stripe",     Icon: StripeIcon     },
  { name: "Vercel",     Icon: VercelIcon     },
  { name: "Cloudflare", Icon: CloudflareIcon },
  { name: "Shopify",    Icon: ShopifyIcon    },
  { name: "Twilio",     Icon: TwilioIcon     },
  { name: "HashiCorp",  Icon: HashiCorpIcon  },
] as const;

// ─── Animation variants ───────────────────────────────────────────────────────

const logoContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const logoItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function TrustedBy(): JSX.Element {
  return (
    <section className="pb-14 pt-16 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: EASE }}
        className="mb-10 text-[13px] font-medium uppercase tracking-[0.08em] text-[#9ca3af]"
      >
        Trusted by teams shipping at scale
      </motion.p>

      <motion.div
        className="mx-auto flex max-w-[1060px] flex-wrap items-center justify-center gap-x-12 gap-y-6"
        variants={logoContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {LOGOS.map((logo) => (
          <motion.span
            key={logo.name}
            variants={logoItem}
            className="flex items-center gap-[8px] text-[15px] font-semibold text-[#c0c0c8] transition-colors duration-200 hover:text-[#9ca3af]"
          >
            <span className="flex items-center">
              <logo.Icon />
            </span>
            {logo.name}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
