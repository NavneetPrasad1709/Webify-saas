"use client";

import { Reveal, SectionHeading } from "./ui";

/* eslint-disable @next/next/no-img-element */

const CARDS = [
  {
    icon: "/images/icon-shield.svg",
    title: "Ironclad Protection",
    body: "Safeguard every conversation with end-to-end encryption and real-time monitoring.",
  },
  {
    icon: "/images/icon-stack.svg",
    title: "Effortless Connections",
    body: "Native hooks into your CRM, calendar, and helpdesk — two-way sync in minutes.",
  },
  {
    icon: "/images/icon-grow.svg",
    title: "Ready to Grow",
    body: "Cloud-native infrastructure that scales from your first lead to your millionth.",
  },
];

/** "Your all-in-one SaaS engine." — the 750px top padding is the window
 *  where the 3D object rises through the viewport. */
export default function Engine() {
  return (
    <section className="relative flex min-h-[75px] w-full flex-col items-center justify-end px-10 pt-[750px] pb-[120px] max-[992px]:px-5 max-[992px]:pt-[480px] max-[480px]:pt-[46dvh] max-[480px]:pb-20">
      <div className="flex w-full max-w-[1440px] flex-col gap-20 max-[480px]:gap-12">
        <Reveal data-shot="engine-head" className="flex w-full flex-row items-end justify-center">
          <SectionHeading
            eyebrow="Platform"
            title="Your all-in-one SaaS engine."
            subtitle="Tools, security, and integrations — everything you need to launch and scale, zero hassle."
          />
        </Reveal>
        <div className="grid grid-cols-3 gap-5 max-[992px]:grid-cols-2 max-[640px]:grid-cols-1">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 0.08}
              className={`card rounded-2xl border border-white/10 bg-black/70 ${i === 2 ? "max-[992px]:col-span-2 max-[640px]:col-span-1" : ""}`}
            >
              <div className="flex h-full w-full flex-col items-start justify-between gap-24 p-9 max-[992px]:gap-14 max-[480px]:gap-10 max-[480px]:p-[6dvw]">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <img src={card.icon} alt="" className="h-8" />
                </div>
                <div className="flex w-full flex-col items-start gap-3.5">
                  <h3 className="display text-[clamp(1.5rem,1.9vw,2rem)] leading-[1.08]">
                    {card.title}
                  </h3>
                  <p className="text-lg leading-[1.5] font-normal tracking-[-0.01em] text-white/75">
                    {card.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
