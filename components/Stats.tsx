"use client";

import { CountUp, Reveal } from "./ui";

const STATS = [
  { value: "99.99%", label: "Always On, Always Reliable" },
  { value: "1M+", label: "People Powered by Vexel" },
  { value: "24/7", label: "Real Humans, Real Help" },
];

export default function Stats() {
  return (
    <>
      <div data-tl="0.225" className="block h-0 w-full" />
      <section
        data-shot="stats-sec"
        className="flex w-full flex-col items-center justify-center gap-12 px-10 pt-[60px] pb-[120px] max-[992px]:px-5 max-[480px]:gap-8 max-[480px]:pt-10 max-[480px]:pb-20"
      >
        <Reveal>
          <span className="eyebrow">By the numbers</span>
        </Reveal>
        <div className="grid w-full max-w-[1440px] grid-cols-3 gap-5 max-[992px]:grid-cols-2 max-[640px]:grid-cols-1">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.value}
              delay={i * 0.08}
              className={`card rounded-2xl border border-white/10 bg-black/60 ${i === 2 ? "max-[992px]:col-span-2 max-[640px]:col-span-1" : ""}`}
            >
              <div className="flex w-full flex-col items-start gap-4 p-9 max-[480px]:p-[6dvw]">
                <div className="display text-[clamp(3.25rem,4.6vw,5rem)] leading-none tracking-[-0.02em]">
                  {/* 24/7 is a ratio, not a countable number — keep it static */}
                  {stat.value === "24/7" ? (
                    stat.value
                  ) : (
                    <CountUp value={stat.value} />
                  )}
                </div>
                <div className="font-mono text-[13px] leading-[1.4] tracking-[0.14em] text-white/65 uppercase">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
