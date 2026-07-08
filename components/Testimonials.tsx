"use client";

import { Reveal } from "./ui";

/* eslint-disable @next/next/no-img-element */

const TESTIMONIALS = [
  {
    quote:
      "Vexel cut our manual follow-up work in half. Replies go out in under a minute, and demo bookings were up 31% in our first month.",
    avatar: "/images/avatar-1.png",
    name: "Alex Chen",
    role: "Operations Manager, Northbeam",
  },
  {
    quote:
      "Finally, a tool that feels smart but stays simple. Our team collaborates faster, tracks everything, and we’ve grown our active users by 40%.",
    avatar: "/images/avatar-2.jpg",
    name: "Priya Das",
    role: "Head of Product, Relayly",
  },
  {
    quote:
      "I love how intuitive it is. It plugs right into our stack, keeps data secure, and helps us ship new ideas without the chaos.",
    avatar: "/images/avatar-3.jpg",
    name: "Daniel Rivera",
    role: "CTO, Fieldstone",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-shot="testi-sec"
      className="flex w-full flex-col items-center justify-center gap-20 px-10 pt-[120px] pb-[60px] max-[992px]:px-5 max-[480px]:gap-10 max-[480px]:pt-20 max-[480px]:pb-10"
    >
      <Reveal className="flex w-full max-w-[1440px] flex-row items-end justify-center">
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="display on-scene text-[clamp(2.25rem,4.6vw,4.6rem)] leading-[1.08] max-[480px]:text-[2.2rem]">
            See what our clients love
          </h2>
          <p className="on-scene max-w-[52ch] text-xl leading-[1.5] font-normal tracking-[-0.01em] text-white/85 max-[992px]:text-lg">
            Discover why teams trust Vexel to automate workflows, boost growth,
            and deliver standout experiences.
          </p>
        </div>
      </Reveal>
      <div className="grid w-full max-w-[1440px] grid-cols-3 gap-5 max-[992px]:grid-cols-2 max-[640px]:grid-cols-1">
        {TESTIMONIALS.map((t, i) => (
          <Reveal
            key={t.name}
            delay={i * 0.08}
            className={`card rounded-2xl border border-white/10 bg-black/70 ${i === 2 ? "max-[992px]:col-span-2 max-[640px]:col-span-1" : ""}`}
          >
            <figure className="flex h-full w-full flex-col items-start justify-between gap-10 p-9 max-[992px]:p-6 max-[480px]:p-[6dvw]">
              <blockquote className="text-[22px] leading-[1.4] font-light tracking-[-0.02em] text-white/90 max-[992px]:text-lg max-[992px]:font-normal max-[480px]:text-[19px]">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex w-full flex-row items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-white/20"
                />
                <div className="flex flex-col gap-1.5">
                  <div className="text-base leading-none font-medium tracking-[-0.01em] text-white">
                    {t.name}
                  </div>
                  <div className="font-mono text-[13px] leading-[1.3] tracking-[0.08em] text-white/65 uppercase">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
