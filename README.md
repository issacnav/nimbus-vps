# NimbusVPS — marketing site

Single-page marketing and product preview for **NimbusVPS**, a fictional-but-grounded VPS / cloud console brand. This repo is the **front-end only**: there is no real control plane, billing, or metrics API—numbers in the UI are **illustrative** and exist to sell the story of the product, not to report live infrastructure.

**Design inspiration:** [Tada — Product Development with Data Presenting](https://dribbble.com/shots/26511945-Tada-Product-Development-with-Data-Presenting) on Dribbble (HeyDetya).

## Stack

- **Next.js 14** (App Router), **React 18**, **TypeScript**
- **Tailwind CSS** for layout and theming
- **Framer Motion** for section and micro-interactions
- **Vanta.js** + **Three.js** for the hero sky / cloud background (WebGL, lazy-loaded)

Light and dark themes are persisted with `localStorage` (`nimbusvps-theme`).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

## Project layout

| Path | Role |
|------|------|
| `app/` | Routes, `layout.tsx`, global CSS, metadata |
| `components/layout/` | `Navbar`, `Footer` |
| `components/theme/` | `ThemeProvider`, `ThemeToggle` |
| `components/ui/` | Shared pieces (`SectionMarkers`, `TrustedBy`) |
| `components/sections/` | Page sections (`ProductFeatures`, `InfraStats`, `Pricing`) |
| `components/sections/hero/` | Hero, Vanta canvas, console **dashboard mock** |
| `lib/` | Hooks such as `useDarkClass` |
| `public/` | Static assets (e.g. pricing background image) |

The large “console” table in the hero is **`DashboardMockup.tsx`**—pure UI, no data fetching.

## Demo data

Stats, IPs, CPU/RAM percentages, and uptime strings in the mockups are **hand-authored demo values**, not telemetry. They are intentionally varied so aggregates (e.g. fleet averages) line up with what’s shown in the server list—useful when you’re iterating on layout, less useful as operational truth.

## Repo

Upstream: [github.com/issacnav/nimbus-vps](https://github.com/issacnav/nimbus-vps).
