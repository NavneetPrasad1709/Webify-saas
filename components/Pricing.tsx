"use client";

import { Reveal, PillButton, SectionHeading } from "./ui";

/* eslint-disable @next/next/no-img-element */

const PLANS = [
  {
    name: "Starter",
    description:
      "Kick off your pipeline with one AI agent for individuals and small teams.",
    price: "Free",
    suffix: "",
    features: [
      "1 AI agent",
      "200 conversations / month",
      "Website chat widget",
      "Email follow-ups",
      "1 GB secure storage",
    ],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Pro",
    description: "More power for growing revenue teams ready to move faster.",
    price: "$49",
    suffix: "/month",
    features: [
      "Unlimited conversations",
      "Lead scoring & smart routing",
      "CRM & calendar sync",
      "Outreach sequences",
      "50 GB secure storage",
    ],
    cta: "Start 14-Day Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    description: "All features unlocked plus dedicated support and controls.",
    price: "Custom",
    suffix: "",
    features: [
      "Unlimited agents & seats",
      "SSO/SAML & audit logs",
      "Custom models & workflows",
      "Dedicated success manager",
      "99.99% uptime SLA",
    ],
    cta: "Talk to Sales",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      data-shot="pricing-sec"
      className="vignette-top flex w-full flex-col items-center justify-center gap-20 px-10 py-[120px] max-[992px]:px-5 max-[480px]:gap-10 max-[480px]:py-20"
    >
      <Reveal className="flex w-full max-w-[1440px] flex-row items-end justify-center">
        <SectionHeading
          eyebrow="Pricing"
          title="Plans that grow with you."
          subtitle="Flexible pricing for teams of every size and stage. Upgrade, downgrade, or cancel anytime."
        />
      </Reveal>
      <div className="grid w-full max-w-[1440px] grid-cols-3 gap-5 max-[768px]:grid-cols-1">
        {PLANS.map((plan, i) => (
          <Reveal
            key={plan.name}
            delay={i * 0.08}
            className={`card relative rounded-2xl border bg-black/70 ${
              plan.featured ? "border-[#18caff]/35" : "border-white/10"
            }`}
          >
            <div className="relative flex h-full w-full flex-col items-start gap-12 p-9 max-[480px]:gap-8 max-[480px]:p-[6dvw]">
              {plan.featured && (
                <>
                  <div
                    className="absolute top-0 left-0 z-[-1] h-[110px] w-full"
                    style={{ backgroundColor: "#0083ff", filter: "blur(116px)" }}
                  />
                  <span className="absolute top-6 right-6 rounded-full border border-[#18caff]/40 bg-[#18caff]/10 px-3 py-1.5 font-mono text-[12px] leading-none tracking-[0.18em] text-[#18caff] uppercase">
                    Popular
                  </span>
                </>
              )}
              <div className="flex w-full flex-col items-start gap-3">
                <h3 className="display text-[1.6rem] leading-none">{plan.name}</h3>
                <p className="max-w-[28ch] text-base leading-[1.5] font-normal text-white/70">
                  {plan.description}
                </p>
              </div>
              <div className="flex h-full w-full grow flex-col items-start justify-between gap-9 max-[480px]:gap-7">
                <div className="flex w-full flex-col gap-9">
                  <div className="display text-[clamp(3rem,3.6vw,4rem)] leading-none">
                    {plan.price}
                    {plan.suffix && (
                      <span className="ml-1 text-xl font-light text-white/60">
                        {plan.suffix}
                      </span>
                    )}
                  </div>
                  <div className="h-px w-full bg-white/10" />
                  <ul className="flex w-full flex-col gap-3.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex w-full flex-row items-center gap-3">
                        <img src="/images/check.svg" alt="" className="h-4" />
                        <span className="text-base leading-[1.4] font-normal text-white/80">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <PillButton
                  variant={plan.featured ? "white" : "ghost"}
                  href="#pricing"
                  className="w-full"
                >
                  {plan.cta}
                </PillButton>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
