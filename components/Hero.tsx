"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PillButton, SplitReveal, EASE_BRAND } from "./ui";

/* eslint-disable @next/next/no-img-element */

/** Smootherstep for the dashboard dolly-in. */
const smooth = (p: number) => p * p * (3 - 2 * p);

/**
 * Hero: sequenced entrance after the loader, copy recedes (fade + lift +
 * blur) on scroll, dashboard dollies in (scale 1 → 1.3 from top-center).
 */
export default function Hero({ ready = true }: { ready?: boolean }) {
  const copyRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let travel = window.innerHeight * 0.55;
    if (dashRef.current) {
      const rect = dashRef.current.getBoundingClientRect();
      travel = Math.max(1, rect.top + window.scrollY);
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      if (copyRef.current) {
        const fade = Math.min(Math.max(y / (vh * 0.55), 0), 1);
        copyRef.current.style.opacity = `${1 - fade}`;
        copyRef.current.style.pointerEvents = fade >= 0.95 ? "none" : "auto";
        copyRef.current.style.visibility = fade >= 0.98 ? "hidden" : "visible";
        if (!reduced) {
          copyRef.current.style.transform = `translateY(${-40 * fade}px)`;
        }
      }
      if (dashRef.current && !reduced) {
        const p = smooth(Math.min(Math.max(y / travel, 0), 1));
        dashRef.current.style.transform = `scale(${1 + 0.3 * p}) translateY(${-24 * p}px)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, ease: EASE_BRAND, delay },
  });

  return (
    <>
      <div data-tl="0" className="block h-0 w-full" />
      <section
        id="hero-trigger"
        className="relative flex h-dvh min-h-[75px] w-full flex-col items-center justify-start px-10 pt-[max(140px,16dvh)] max-[992px]:px-5 [@media(min-width:993px)_and_(max-height:860px)]:pt-24 [@media(min-width:993px)_and_(max-height:720px)]:pt-20"
      >
        <div
          ref={copyRef}
          className="sticky bottom-0 z-[6] flex w-full max-w-[1440px] flex-col items-center gap-6 will-change-transform max-[480px]:gap-5 [@media(min-width:993px)_and_(max-height:860px)]:gap-4"
        >
          {/* Legibility scrim over the bright scene */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-6%] inset-y-[-18%] z-[-1]"
            style={{
              background:
                "radial-gradient(55% 65% at 50% 45%, rgba(0,4,16,0.62), transparent 72%)",
            }}
          />

          {/* Badge */}
          <motion.div
            {...rise(0.05)}
            className="flex flex-row items-center justify-center gap-3 rounded-full border border-white/12 bg-black/80 py-2 pr-5 pl-4"
          >
            <img src="/images/badge-sparkle.svg" alt="" className="h-4 shrink-0" />
            <span className="font-mono text-[13px] leading-[1.5] tracking-[0.16em] text-white/85 uppercase max-[480px]:text-[12px] max-[480px]:tracking-[0.06em]">
              <span className="max-[480px]:hidden">Now with Smart Chatbot Integration</span>
              <span className="hidden max-[480px]:inline">Smart Chatbot Integration</span>
            </span>
          </motion.div>

          <div className="flex flex-col items-center gap-6 max-[480px]:gap-5 [@media(min-width:993px)_and_(max-height:860px)]:gap-4">
            <SplitReveal
              as="h1"
              play={ready}
              delay={0.15}
              lines={["Turn Conversations", "Into Conversions."]}
              className="display on-scene text-center text-[clamp(2.75rem,6vw,6.5rem)] tracking-[-0.03em] max-[480px]:text-[clamp(2rem,9vw,2.3rem)] [@media(min-width:993px)_and_(max-height:860px)]:text-[clamp(2.5rem,4.6vw,4.25rem)] [@media(min-width:993px)_and_(max-height:720px)]:text-[clamp(2.25rem,4vw,3.5rem)]"
              lineClassName="leading-[0.98]"
            />
            <motion.p
              {...rise(0.5)}
              className="on-scene max-w-[48ch] text-center text-xl leading-[1.5] font-normal tracking-[-0.01em] text-white/90 max-[992px]:text-lg max-[480px]:max-w-[34ch] [@media(min-width:993px)_and_(max-height:860px)]:text-lg"
            >
              Vexel is the AI sales agent that answers every lead in seconds,
              qualifies the conversation, and books the meeting — around the
              clock.
            </motion.p>
            <motion.div
              {...rise(0.62)}
              className="flex w-full flex-row flex-wrap items-center justify-center gap-4"
            >
              <PillButton variant="white" href="#pricing">
                Get Started
              </PillButton>
              <PillButton variant="ghost" href="#features">
                See It in Action
              </PillButton>
            </motion.div>
            <motion.p
              {...rise(0.74)}
              className="on-scene font-mono text-[13px] leading-[1.6] tracking-[0.2em] text-white/70 uppercase max-[480px]:text-[12px] max-[480px]:tracking-[0.08em]"
            >
              1M+ teams · 99.99% uptime · 24/7 support
            </motion.p>
          </div>
        </div>

        {/* Dashboard screenshot */}
        <div
          ref={dashRef}
          className="glass absolute bottom-[-565px] z-0 flex h-[750px] w-[1000px] max-w-[1440px] origin-top items-center justify-center rounded-[32px] border border-white/15 bg-black/30 p-[10px] shadow-[0_-30px_120px_-40px_rgba(0,108,255,0.35)] will-change-transform max-[992px]:bottom-[-162px] max-[992px]:h-[325px] max-[992px]:w-[min(500px,calc(100vw-40px))] max-[992px]:rounded-2xl max-[480px]:bottom-[-60px] max-[480px]:h-auto max-[480px]:w-[85%] max-[480px]:rounded-lg max-[480px]:p-[5px] [@media(min-width:993px)_and_(max-height:860px)]:bottom-[-610px] [@media(min-width:993px)_and_(max-height:720px)]:bottom-[-650px]"
        >
          <img
            src="/images/dashboard.png"
            alt="Vexel dashboard overview"
            className="h-full w-full rounded-3xl object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>
    </>
  );
}
