# Vexel AI — SaaS Landing Page

Pixel-faithful rebuild of the Vexel AI reference site
(https://tranquil-495tmg.peachworlds.com/), reverse-engineered from the
reference video (`saas.mp4`) and the live site's scene/state data.

## Stack

- **Next.js (App Router) + TypeScript** — static prerender, SEO metadata
- **Tailwind CSS v4** — design tokens matched to the reference styles
- **React Three Fiber + three.js** — the 32-tori GLB (Draco-compressed) with
  its built-in looping animation, physical material override
  (`#006cff` base / `#65a5ff` emissive, alpha-mapped dots), two cyan point
  lights, mouse-tilt camera (±1°, 0.6 s easing)
- **@react-three/postprocessing** — Bloom (1.5 / radius 0.75 / threshold 0.9),
  HueSaturation (−0.2224 rad, +0.21), AgX tone mapping, 8× MSAA
- **Lenis** — 1.2 s smooth scrolling on desktop (native on touch)
- **Framer Motion** — spring fade-up reveals, mobile menu transitions

## Scroll choreography

The 3D object's flight path is data-driven ([lib/timeline.ts](lib/timeline.ts)):
keyframe tracks (position/rotation, linear segments) are sampled by a 0–1 page
timeline. Zero-height `[data-tl]` anchor divs pin timeline percentages
(0 → 0.1 → 0.225 → 0.25 → 0.35 → 0.4) to document positions; scroll progress is
piecewise-linear between anchors. Keep section heights and anchors coupled —
moving one desyncs the 3D acts from the copy.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (static)
npm start
```

## Assets

All images, the GLB model, its alpha map, and the Draco decoder are served
locally from `public/`. 3D model credit: Tamminen (sketchfab.com/tamminen), as
credited in the site footer.
