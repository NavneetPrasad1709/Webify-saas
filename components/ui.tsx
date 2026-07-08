"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/* eslint-disable @next/next/no-img-element */

export const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

/** Smooth-scroll to an in-page anchor through Lenis (falls back to native). */
export function scrollToAnchor(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(target as Element, { duration: 1.4 });
  else (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
}

/**
 * Pill button with the circular arrow icon.
 * "white" = the one primary action; "ghost" = dark glass plate that stays
 * legible over the bright 3D scene.
 */
export function PillButton({
  children,
  variant = "ghost",
  href = "#",
  className = "",
  small = false,
}: {
  children: ReactNode;
  variant?: "ghost" | "white" | "black";
  href?: string;
  className?: string;
  small?: boolean;
}) {
  const isPrimary = variant === "white";
  const palette = isPrimary
    ? "border border-white bg-white text-black"
    : "border border-white/20 bg-black/60 text-white hover:border-white/35 hover:bg-black/75";
  const pad = small
    ? "py-2 pl-4 pr-2"
    : "py-3.5 pl-6 pr-3.5 max-[992px]:py-3 max-[992px]:pl-5 max-[992px]:pr-3";
  const onClick = href.startsWith("#")
    ? (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToAnchor(href);
      }
    : undefined;
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group flex cursor-pointer items-center justify-center gap-3 rounded-full transition-[transform,background-color,border-color] duration-300 ease-[var(--ease-brand)] hover:scale-[1.02] active:scale-[0.98] ${palette} ${className}${" "}${pad}`}
    >
      <span
        className={`leading-none font-medium tracking-[-0.01em] ${small ? "text-sm" : "text-base"}`}
      >
        {children}
      </span>
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-[transform,background-color] duration-300 ease-[var(--ease-brand)] group-hover:translate-x-0.5 ${isPrimary ? "group-hover:bg-[#18caff]/25" : "group-hover:bg-[#18caff]/20"}`}
      >
        <img
          src="/images/arrow.png"
          alt=""
          className="h-6 w-6 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:rotate-45"
        />
      </span>
    </a>
  );
}

/** Spring fade-up reveal, fires as content approaches reading position. */
export function Reveal({
  children,
  className = "",
  style,
  delay = 0,
  x = 0,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  x?: number;
} & Record<string, unknown>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: x === 0 ? 28 : 0, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ type: "spring", stiffness: 80, damping: 18, mass: 1, delay }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masked line reveal: each line rises out of an overflow-hidden slot.
 * The in-view observer lives on the UNCLIPPED wrapper (a fully-masked line
 * never intersects, so observing the line itself would never fire); the
 * masked lines animate via variant propagation.
 */
export function SplitReveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  as: Tag = "h2",
  play = true,
  inView = false,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "div";
  play?: boolean;
  inView?: boolean;
}) {
  const trigger = inView
    ? {
        whileInView: "show" as const,
        viewport: { once: true, margin: "0px 0px -10% 0px" },
      }
    : { animate: play ? ("show" as const) : ("hidden" as const) };
  return (
    <Tag className={className}>
      <motion.span className="block" initial="hidden" {...trigger}>
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden py-[0.06em]">
            <motion.span
              className={`block will-change-transform ${lineClassName}`}
              variants={{ hidden: { y: "112%" }, show: { y: "0%" } }}
              transition={{
                duration: 0.9,
                ease: EASE_BRAND,
                delay: delay + i * 0.12,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Scroll-linked zoom parallax: media eases from scale 1.12 → 1 as it
 * traverses the viewport, with a slight counter-drift. */
export function ZoomParallax({
  children,
  className = "",
  strength = 0.12,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1 + strength, 1, 1 + strength * 0.4]);
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ scale, y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/** Count-up numeral: parses the numeric part and tweens it on first view. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const match = value.match(/^([^0-9]*)([0-9.,]+)(.*)$/);
    if (!match) {
      ref.current.textContent = value;
      return;
    }
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] || "").length;
    const controls = animate(mv, target, {
      duration: 1.4,
      ease: EASE_BRAND as unknown as [number, number, number, number],
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <span ref={ref} className={className}>
      {value.replace(/[0-9.,]+/, (m) => "0".padStart(Math.min(m.length, 1), "0"))}
    </span>
  );
}

/** Centered section heading: mono eyebrow, display title, soft subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  subtitleClassName = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  subtitleClassName?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center max-[480px]:gap-4">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="display on-scene text-[clamp(2.25rem,4.6vw,4.6rem)] leading-[1.08] max-[480px]:text-[2.2rem]">
        {title}
      </h2>
      <p
        className={`on-scene max-w-[46ch] text-xl leading-[1.5] font-normal tracking-[-0.01em] text-white/85 max-[992px]:text-lg ${subtitleClassName}`}
      >
        {subtitle}
      </p>
    </div>
  );
}

/** Delegated cursor-light for .card elements (sets --mx/--my). */
export function CardLight() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement | null)?.closest?.(".card") as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}
