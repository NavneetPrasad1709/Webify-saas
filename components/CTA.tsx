"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PillButton, Reveal, SplitReveal } from "./ui";

/* eslint-disable @next/next/no-img-element */

const SOCIALS = [
  { src: "/images/social-linkedin.png", href: "#", label: "LinkedIn" },
  { src: "/images/social-discord.png", href: "#", label: "Discord" },
  { src: "/images/social-x.png", href: "#", label: "X" },
];

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <>
      <div data-tl="0.25" className="block h-0 w-full" />
      <div data-tl="0.35" className="block h-0 w-full" />
      <section
        ref={ref}
        data-shot="cta-sec"
        className="flex h-dvh min-h-[75px] w-full flex-col items-center justify-end"
      >
        <div className="relative flex h-dvh w-full flex-col items-center justify-center px-10 max-[480px]:px-5">
          {/* Legibility scrim over the returning 3D object */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 55% at 50% 48%, rgba(0,4,16,0.5), transparent 75%)",
            }}
          />
          <motion.div
            style={{ scale }}
            className="relative flex flex-col items-center gap-9 will-change-transform max-[480px]:gap-6"
          >
            <Reveal>
              <span className="eyebrow">Ready when you are</span>
            </Reveal>
            <SplitReveal
              as="h2"
              inView
              lines={["Launch with Vexel."]}
              className="display on-scene text-center text-[clamp(3.25rem,7.2vw,8rem)] tracking-[-0.03em] max-[480px]:text-[clamp(2.4rem,10.5vw,2.9rem)]"
              lineClassName="leading-[0.98]"
            />
            <Reveal delay={0.18} className="flex flex-row flex-wrap items-center justify-center gap-4">
              <PillButton variant="white" href="#pricing">
                Get Started
              </PillButton>
              <PillButton variant="ghost" href="#features">
                See It in Action
              </PillButton>
            </Reveal>
            <Reveal delay={0.28} className="mt-2 flex flex-row items-center justify-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-black/60 p-2.5 transition-[background-color,border-color] duration-300 hover:border-white/30 hover:bg-black/70"
                >
                  <img src={social.src} alt="" className="w-full" />
                </a>
              ))}
            </Reveal>
          </motion.div>

          {/* Footer bar */}
          <div className="absolute right-0 bottom-0 left-0 border-t border-white/10 bg-black/70">
            <div className="mx-auto flex w-full max-w-[1440px] flex-row items-center justify-between gap-4 px-10 py-5 max-[992px]:px-5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-3">
              <img src="/images/logo-white.svg" alt="Vexel" className="w-[72px] opacity-90" />
              <div className="font-mono text-xs leading-[1.6] tracking-[0.08em] text-white/75 uppercase">
                © {new Date().getFullYear()} — Vexel Inc. All rights reserved
              </div>
              <div className="font-mono text-xs leading-[1.6] tracking-[0.08em] text-white/75 uppercase">
                3D model by{" "}
                <a
                  href="https://sketchfab.com/tamminen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-my-2 inline-block py-2 text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Tamminen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div data-tl="0.4" className="block h-0 w-full" />
    </>
  );
}
