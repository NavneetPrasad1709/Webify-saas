"use client";

import { Reveal, SectionHeading, ZoomParallax } from "./ui";

/* eslint-disable @next/next/no-img-element */

const ROW_1 = [
  {
    title: "Full-Spectrum Encryption",
    body: "AES-256 at rest, TLS 1.3 in transit. Every conversation is shielded end-to-end with real-time threat monitoring — day or night.",
    image: "/images/security-1.png",
    wide: true,
  },
  {
    title: "Plug & Protect",
    body: "Connect your CRM, calendar, and helpdesk without loosening a single control — scoped tokens, least-privilege access, always in sync.",
    image: "/images/security-2.png",
    wide: false,
  },
];

const ROW_2 = [
  {
    title: "Access, Controlled",
    body: "SSO/SAML, role-based permissions, and full audit logs — so the right people see the right conversations, and nothing else.",
    image: "/images/security-3.png",
    wide: false,
  },
  {
    title: "Global-Grade Reliability",
    body: "Multi-region infrastructure with a 99.99% uptime SLA. Compliant with SOC 2 Type II, GDPR, and ISO 27001 standards worldwide.",
    image: "/images/security-4.png",
    wide: true,
  },
];

function SecurityCard({
  card,
  delay,
}: {
  card: (typeof ROW_1)[number];
  delay: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={`card rounded-2xl border border-white/10 bg-black/75 ${
        card.wide ? "col-span-2" : "col-span-1"
      } max-[992px]:col-span-3`}
    >
      <div
        className={`flex h-full w-full gap-8 p-9 max-[992px]:p-6 max-[480px]:p-[6dvw] ${
          card.wide
            ? "flex-row items-center max-[768px]:flex-col max-[768px]:items-start"
            : "flex-col items-start justify-between"
        }`}
      >
        <div
          className={`flex flex-col items-start gap-3.5 ${card.wide ? "w-[46%] shrink-0 max-[768px]:w-full" : "w-full"}`}
        >
          <h3 className="display text-[clamp(1.35rem,1.8vw,1.9rem)] leading-[1.1]">
            {card.title}
          </h3>
          <p className="text-base leading-[1.55] font-normal tracking-[-0.01em] text-white/75 max-[480px]:text-[17px]">
            {card.body}
          </p>
        </div>
        <ZoomParallax className="w-full rounded-xl" strength={0.08}>
          <img
            src={card.image}
            alt={card.title}
            loading="lazy"
            decoding="async"
            className="h-[300px] w-full object-contain max-[992px]:h-[220px]"
          />
        </ZoomParallax>
      </div>
    </Reveal>
  );
}

export default function Security() {
  return (
    <>
      <div data-tl="0.1" className="block h-0 w-full" />
      <section
        id="security"
        className="flex min-h-[75px] w-full flex-col items-center justify-start px-10 pb-[120px] max-[992px]:px-5 max-[480px]:pb-20"
      >
        {/* Spacer where the 3D object leaves the frame */}
        <div className="block h-[50dvh] min-h-[75px] w-full max-[480px]:h-[22dvh]" />
        <div className="flex w-full max-w-[1440px] flex-col items-center gap-20 max-[480px]:gap-10">
          <Reveal className="flex w-full flex-row items-end justify-center">
            <SectionHeading
              eyebrow="Security"
              title="Rock-solid security, everywhere."
              subtitle="Stay protected and connected with advanced encryption and frictionless integrations — no downtime, no compromises."
            />
          </Reveal>
          <div className="flex w-full flex-col gap-5">
            <div data-shot="sec-row-1" className="grid w-full grid-cols-3 gap-5">
              {ROW_1.map((card, i) => (
                <SecurityCard key={card.title} card={card} delay={i * 0.08} />
              ))}
            </div>
            <div className="grid w-full grid-cols-3 gap-5">
              {ROW_2.map((card, i) => (
                <SecurityCard key={card.title} card={card} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
